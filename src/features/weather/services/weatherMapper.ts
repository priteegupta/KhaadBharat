import { WeatherData, CurrentWeather, HourlyForecast, DailyForecast, FarmingInsight, IrrigationAdvice, WeatherAlert } from "./weatherTypes";

// Helper to map WMO weather codes to text condition labels
export function mapWmoCodeToText(code: number): string {
  if (code === 0) return "Clear Sky";
  if (code >= 1 && code <= 3) return "Partly Cloudy";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 55) return "Light Drizzle";
  if (code >= 61 && code <= 65) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 95 && code <= 99) return "Thunderstorm";
  return "Cloudy";
}

// Helper to determine daily sowing suitability rating
export function calculateSowingSuitability(temp: number, rainProb: number, windSpeed: number): "excellent" | "good" | "fair" | "poor" {
  if (temp >= 20 && temp <= 30 && rainProb < 20 && windSpeed < 15) {
    return "excellent";
  }
  if (temp >= 15 && temp <= 35 && rainProb < 45 && windSpeed < 22) {
    return "good";
  }
  if (rainProb >= 75 || windSpeed >= 32 || temp > 40 || temp < 5) {
    return "poor";
  }
  return "fair";
}

// Generator for dynamic farming insights
export function generateFarmingInsights(temp: number, humidity: number, windSpeed: number, rainProb: number): FarmingInsight[] {
  const insights: FarmingInsight[] = [];

  if (windSpeed >= 22) {
    insights.push({ type: "warning", messageKey: "weather.insights.sprayWarning" });
  } else if (windSpeed <= 15 && rainProb < 20) {
    insights.push({ type: "success", messageKey: "weather.insights.sprayOk" });
  }

  if (humidity >= 75) {
    insights.push({ type: "warning", messageKey: "weather.insights.humidityHigh" });
  }

  if (rainProb >= 60) {
    insights.push({ type: "warning", messageKey: "weather.insights.rainSoon" });
  }

  if (insights.length === 0) {
    insights.push({ type: "info", messageKey: "weather.insights.normalConditions" });
  }

  return insights;
}

// Generator for irrigation recommendations
export function generateIrrigationAdvice(temp: number, humidity: number, rainProb: number): IrrigationAdvice {
  // Compute a mock soil moisture index responding dynamically to parameters
  const moistureIndex = Math.max(15, Math.min(95, Math.round(100 - (temp * 1.4) + (humidity * 0.3) + (rainProb * 0.2))));
  
  if (rainProb >= 60) {
    return {
      status: "rain",
      messageKey: "weather.irrigation.rainExpected",
      moistureIndex
    };
  }

  if (temp >= 35 && rainProb < 20) {
    return {
      status: "evap",
      messageKey: "weather.irrigation.evapWarning",
      moistureIndex
    };
  }

  if (moistureIndex < 40) {
    return {
      status: "low",
      messageKey: "weather.irrigation.warningLowMoisture",
      moistureIndex
    };
  }

  return {
    status: "normal",
    messageKey: "weather.irrigation.normalAdvice",
    moistureIndex
  };
}

// Generator for active weather alerts
export function generateWeatherAlerts(temp: number, windSpeed: number, rainProb: number, conditionText: string): WeatherAlert[] {
  const alerts: WeatherAlert[] = [];

  if (temp >= 40) {
    alerts.push({ level: "danger", messageKey: "weather.alerts.heatWarning" });
  }

  if (windSpeed >= 28) {
    alerts.push({ level: "warning", messageKey: "weather.alerts.windWarning" });
  }

  if (rainProb >= 80 && conditionText.toLowerCase().includes("rain")) {
    alerts.push({ level: "danger", messageKey: "weather.alerts.rainWarning" });
  }

  if (conditionText.toLowerCase().includes("thunderstorm")) {
    alerts.push({ level: "danger", messageKey: "weather.alerts.stormAlert" });
  }

  return alerts;
}

// ----------------------------------------------------
// MAPPER: OPEN-METEO RESPONSE MAPPER
// ----------------------------------------------------
export function mapOpenMeteoToWeatherData(cityName: string, lat: number, lon: number, rawData: any): WeatherData {
  const currentRaw = rawData.current;
  const dailyRaw = rawData.daily;
  const hourlyRaw = rawData.hourly;

  const currentCondition = mapWmoCodeToText(currentRaw.weather_code);

  const current: CurrentWeather = {
    temp: Math.round(currentRaw.temperature_2m),
    feelsLike: Math.round(currentRaw.apparent_temperature),
    humidity: Math.round(currentRaw.relative_humidity_2m),
    windSpeed: Math.round(currentRaw.wind_speed_10m),
    pressure: Math.round(currentRaw.pressure_msl),
    uvIndex: 2, // Default fallback if hourly uv index isn't available
    sunrise: dailyRaw.sunrise && dailyRaw.sunrise[0] ? dailyRaw.sunrise[0].split("T")[1] : "05:30 AM",
    sunset: dailyRaw.sunset && dailyRaw.sunset[0] ? dailyRaw.sunset[0].split("T")[1] : "06:45 PM",
    conditionText: currentCondition,
    conditionCode: currentRaw.weather_code
  };

  // Map Hourly Forecast (next 24 hours)
  const hourly: HourlyForecast[] = [];
  const now = new Date();
  const currentHourString = now.toISOString().split("T")[0] + "T" + String(now.getHours()).padStart(2, "0") + ":00";
  const startIndex = hourlyRaw.time.findIndex((t: string) => t >= currentHourString) || 0;

  for (let i = startIndex; i < Math.min(startIndex + 24, hourlyRaw.time.length); i++) {
    const rawTime = new Date(hourlyRaw.time[i]);
    const ampm = rawTime.getHours() >= 12 ? "PM" : "AM";
    const displayHour = rawTime.getHours() % 12 || 12;
    const timeLabel = `${displayHour} ${ampm}`;

    hourly.push({
      time: timeLabel,
      temp: Math.round(hourlyRaw.temperature_2m[i]),
      rainProb: Math.round(hourlyRaw.precipitation_probability[i]),
      windSpeed: Math.round(hourlyRaw.wind_speed_10m[i])
    });
  }

  // Map Daily Forecast (7 days)
  const daily: DailyForecast[] = [];
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  for (let i = 0; i < Math.min(7, dailyRaw.time.length); i++) {
    const rawDate = new Date(dailyRaw.time[i]);
    const dayName = daysOfWeek[rawDate.getDay()];
    const wmoCode = dailyRaw.weather_code[i];
    const condition = mapWmoCodeToText(wmoCode);
    const maxTemp = Math.round(dailyRaw.temperature_2m_max[i]);
    const minTemp = Math.round(dailyRaw.temperature_2m_min[i]);
    const rainProb = Math.round(dailyRaw.precipitation_probability_max[i] || 0);

    daily.push({
      day: dayName,
      maxTemp,
      minTemp,
      rainProb,
      conditionCode: wmoCode,
      conditionText: condition,
      suitability: calculateSowingSuitability(maxTemp, rainProb, current.windSpeed)
    });
  }

  return {
    cityName,
    lat,
    lon,
    current,
    hourly,
    daily,
    insights: generateFarmingInsights(current.temp, current.humidity, current.windSpeed, daily[0]?.rainProb || 0),
    irrigation: generateIrrigationAdvice(current.temp, current.humidity, daily[0]?.rainProb || 0),
    alerts: generateWeatherAlerts(current.temp, current.windSpeed, daily[0]?.rainProb || 0, currentCondition)
  };
}

// ----------------------------------------------------
// MAPPER: OPENWEATHER RESPONSE MAPPER
// ----------------------------------------------------
export function mapOpenWeatherToWeatherData(cityName: string, lat: number, lon: number, currentRaw: any, forecastRaw: any): WeatherData {
  const currentCondition = currentRaw.weather[0]?.main || "Cloudy";
  const currentWmoCode = currentRaw.weather[0]?.id || 800; // OpenWeather ID acts as condition code

  const current: CurrentWeather = {
    temp: Math.round(currentRaw.main.temp),
    feelsLike: Math.round(currentRaw.main.feels_like),
    humidity: Math.round(currentRaw.main.humidity),
    windSpeed: Math.round(currentRaw.wind.speed * 3.6), // convert m/s to km/h
    pressure: Math.round(currentRaw.main.pressure),
    uvIndex: 1, // Fallback if uv index is in a separate call
    sunrise: new Date(currentRaw.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    sunset: new Date(currentRaw.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    conditionText: currentCondition,
    conditionCode: currentWmoCode
  };

  // Map hourly from forecast list (first 8 blocks = 24 hours, since forecast is in 3-hour blocks)
  const hourly: HourlyForecast[] = [];
  const forecastList = forecastRaw.list || [];

  for (let i = 0; i < Math.min(8, forecastList.length); i++) {
    const block = forecastList[i];
    const rawTime = new Date(block.dt * 1000);
    const ampm = rawTime.getHours() >= 12 ? "PM" : "AM";
    const displayHour = rawTime.getHours() % 12 || 12;
    const timeLabel = `${displayHour} ${ampm}`;

    hourly.push({
      time: timeLabel,
      temp: Math.round(block.main.temp),
      rainProb: Math.round((block.pop || 0) * 100), // pop is probability of precipitation 0-1
      windSpeed: Math.round(block.wind.speed * 3.6)
    });
  }

  // Map 5 days daily forecast (aggregating 3-hour blocks)
  const daily: DailyForecast[] = [];
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  // Group by day
  const dailyGroups: Record<string, any[]> = {};
  forecastList.forEach((block: any) => {
    const dateStr = new Date(block.dt * 1000).toISOString().split("T")[0];
    if (!dailyGroups[dateStr]) dailyGroups[dateStr] = [];
    dailyGroups[dateStr].push(block);
  });

  const dailyKeys = Object.keys(dailyGroups).sort();
  for (let i = 0; i < Math.min(5, dailyKeys.length); i++) {
    const key = dailyKeys[i];
    const blocks = dailyGroups[key];
    const dateObj = new Date(key);
    const dayName = daysOfWeek[dateObj.getDay()];
    
    // Find min and max temps
    let maxTemp = -999;
    let minTemp = 999;
    let totalRainProb = 0;
    blocks.forEach((b: any) => {
      if (b.main.temp_max > maxTemp) maxTemp = b.main.temp_max;
      if (b.main.temp_min < minTemp) minTemp = b.main.temp_min;
      totalRainProb = Math.max(totalRainProb, b.pop || 0);
    });

    const representativeBlock = blocks[Math.floor(blocks.length / 2)] || blocks[0];
    const condition = representativeBlock.weather[0]?.main || "Cloudy";
    const code = representativeBlock.weather[0]?.id || 800;

    daily.push({
      day: dayName,
      maxTemp: Math.round(maxTemp),
      minTemp: Math.round(minTemp),
      rainProb: Math.round(totalRainProb * 100),
      conditionCode: code,
      conditionText: condition,
      suitability: calculateSowingSuitability(maxTemp, totalRainProb * 100, current.windSpeed)
    });
  }

  // Pad to 7 days if only 5 available using forecast trends
  while (daily.length < 7) {
    const last = daily[daily.length - 1];
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + daily.length);
    const dayName = daysOfWeek[nextDate.getDay()];
    daily.push({
      ...last,
      day: dayName
    });
  }

  return {
    cityName,
    lat,
    lon,
    current,
    hourly,
    daily,
    insights: generateFarmingInsights(current.temp, current.humidity, current.windSpeed, daily[0]?.rainProb || 0),
    irrigation: generateIrrigationAdvice(current.temp, current.humidity, daily[0]?.rainProb || 0),
    alerts: generateWeatherAlerts(current.temp, current.windSpeed, daily[0]?.rainProb || 0, currentCondition)
  };
}
