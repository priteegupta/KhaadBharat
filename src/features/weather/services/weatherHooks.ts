import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "./weatherApi";

export function useWeatherQuery(lat: number, lon: number, cityName: string) {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => fetchWeatherData(lat, lon, cityName),
    enabled: lat !== 0 && lon !== 0 && !!cityName,
    staleTime: 1000 * 60 * 15, // Cache weather for 15 minutes to prevent excessive API requests
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
export default useWeatherQuery;
