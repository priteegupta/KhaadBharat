import axios from "axios";
import { WeatherData } from "./weatherTypes";
import { mapOpenMeteoToWeatherData, mapOpenWeatherToWeatherData } from "./weatherMapper";

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "a1b8222c166a18811de5139d3305af97";

export interface LocationSearchResult {
  name: string;
  lat: number;
  lon: number;
  state?: string;
  country?: string;
}

// 1. Resolve Location Coordinates from Search Query (City name or 6-digit Pincode)
export async function searchLocation(query: string): Promise<LocationSearchResult[]> {
  const isPincode = /^\d{6}$/.test(query.trim());

  if (OPENWEATHER_API_KEY) {
    try {
      if (isPincode) {
        // Zip code search for India
        const url = `https://api.openweathermap.org/geo/1.0/zip?zip=${query.trim()},IN&appid=${OPENWEATHER_API_KEY}`;
        const response = await axios.get(url);
        if (response.data) {
          return [{
            name: response.data.name,
            lat: response.data.lat,
            lon: response.data.lon,
            country: response.data.country
          }];
        }
        return [];
      } else {
        // Direct city search
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query.trim())}&limit=5&appid=${OPENWEATHER_API_KEY}`;
        const response = await axios.get(url);
        return response.data.map((item: any) => ({
          name: item.name,
          lat: item.lat,
          lon: item.lon,
          state: item.state,
          country: item.country
        }));
      }
    } catch (e) {
      console.error("OpenWeather geocoding failed, falling back to Open-Meteo search:", e);
    }
  }

  // Fallback to free Open-Meteo Geocoding
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=5&language=en&format=json`;
    const response = await axios.get(url);
    const results = response.data.results || [];
    return results.map((item: any) => ({
      name: item.name,
      lat: item.latitude,
      lon: item.longitude,
      state: item.admin1,
      country: item.country
    }));
  } catch (e) {
    console.error("Open-Meteo geocoding search failed:", e);
    return [];
  }
}

// 2. Fetch Weather Data for coordinates
export async function fetchWeatherData(lat: number, lon: number, cityName: string): Promise<WeatherData> {
  if (OPENWEATHER_API_KEY) {
    try {
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;

      const [currentRes, forecastRes] = await Promise.all([
        axios.get(currentUrl),
        axios.get(forecastUrl)
      ]);

      return mapOpenWeatherToWeatherData(cityName, lat, lon, currentRes.data, forecastRes.data);
    } catch (e) {
      console.error("OpenWeather fetch failed, falling back to Open-Meteo forecast:", e);
    }
  }

  // Open-Meteo Fetch (Default or Fallback)
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,pressure_msl,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=auto`;
  const response = await axios.get(url);
  return mapOpenMeteoToWeatherData(cityName, lat, lon, response.data);
}
