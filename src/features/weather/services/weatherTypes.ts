export interface CurrentWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  conditionText: string;
  conditionCode: number; // WMO weather code (0-99) or OpenWeather weather ID
}

export interface HourlyForecast {
  time: string; // e.g., "09:00 AM"
  temp: number;
  rainProb: number; // percentage (0-100)
  windSpeed: number;
}

export interface DailyForecast {
  day: string; // e.g., "Monday"
  maxTemp: number;
  minTemp: number;
  rainProb: number;
  conditionCode: number;
  conditionText: string;
  suitability: "excellent" | "good" | "fair" | "poor";
}

export interface FarmingInsight {
  type: "success" | "warning" | "info";
  messageKey: string; // translation key or dynamic message
}

export interface IrrigationAdvice {
  status: "low" | "rain" | "evap" | "normal";
  messageKey: string;
  moistureIndex: number; // 0-100 index
}

export interface WeatherAlert {
  level: "warning" | "danger" | "info";
  messageKey: string;
}

export interface WeatherData {
  cityName: string;
  lat: number;
  lon: number;
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  insights: FarmingInsight[];
  irrigation: IrrigationAdvice;
  alerts: WeatherAlert[];
}
