// @vitest-environment jsdom
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { WeatherPage } from "../pages/WeatherPage";

// Mock React's useState for direct functional component calling
vi.mock("react", async (importOriginal) => {
  const original = await importOriginal<typeof import("react")>();
  return {
    ...original,
    useState: (initialValue: any) => {
      // Mock simple state hook
      return [typeof initialValue === "function" ? initialValue() : initialValue, vi.fn()];
    },
    useRef: (initialValue: any) => {
      return { current: initialValue || null };
    },
    useEffect: () => {},
    useLayoutEffect: () => {},
  };
});

let mockLanguage = "en";
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      if (key === "weather.insights.sprayOk") {
        return mockLanguage === "hi"
          ? "हवा की स्थिति अनुकूल है। कीटनाशकों और तरल खाद का छिड़काव सुरक्षित रूप से किया जा सकता है।"
          : "Wind conditions are excellent. Safe to spray pesticides and liquid compost.";
      }
      return key;
    },
  }),
}));

const mockWeatherData = {
  cityName: "Bhopal",
  lat: 23.2599,
  lon: 77.4126,
  current: {
    temp: 33,
    feelsLike: 35,
    humidity: 60,
    windSpeed: 12,
    pressure: 1010,
    uvIndex: 5,
    sunrise: "05:40 AM",
    sunset: "06:55 PM",
    conditionText: "Partly Cloudy",
    conditionCode: 1,
  },
  hourly: [
    { time: "09:00 AM", temp: 30, rainProb: 10, windSpeed: 8 },
    { time: "12:00 PM", temp: 33, rainProb: 20, windSpeed: 12 },
  ],
  daily: [
    {
      day: "Monday",
      maxTemp: 35,
      minTemp: 24,
      rainProb: 15,
      conditionCode: 1,
      conditionText: "Partly Cloudy",
      suitability: "good" as const,
    },
    {
      day: "Tuesday",
      maxTemp: 33,
      minTemp: 23,
      rainProb: 65,
      conditionCode: 61,
      conditionText: "Rain",
      suitability: "poor" as const,
    },
  ],
  insights: [
    { type: "success" as const, messageKey: "weather.insights.sprayOk" },
  ],
  irrigation: {
    status: "normal" as const,
    messageKey: "weather.irrigation.normalAdvice",
    moistureIndex: 55,
  },
  alerts: [
    { level: "warning" as const, messageKey: "weather.alerts.windWarning" },
  ],
};

let mockIsLoading = false;
let mockIsError = false;

vi.mock("../services/weatherHooks", () => ({
  default: () => ({
    data: mockWeatherData,
    isLoading: mockIsLoading,
    isError: mockIsError,
    refetch: vi.fn(),
  }),
  useWeatherQuery: () => ({
    data: mockWeatherData,
    isLoading: mockIsLoading,
    isError: mockIsError,
    refetch: vi.fn(),
  }),
}));

// Mock SEO
vi.mock("../../../components/common/SEO", () => ({
  default: () => <div data-testid="seo-mock" />,
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className }: any) => <div className={className}>{children}</div>,
    section: ({ children, className }: any) => <section className={className}>{children}</section>,
  },
}));

describe("WeatherPage Component Unit Tests", () => {
  beforeEach(() => {
    mockIsLoading = false;
    mockIsError = false;
    mockLanguage = "en";
    localStorage.setItem(
      "khaad-bharat-last-location",
      JSON.stringify({ name: "New Delhi", lat: 28.6139, lon: 77.2090 })
    );
  });

  it("should render weather components correctly for English language on successful data load", () => {
    mockLanguage = "en";
    const element = WeatherPage({});
    expect(element).toBeDefined();

    // Verify root layout structure
    const container = React.Children.toArray((element as any).props.children);
    expect(container.length).toBe(4);

    // 1. SEO check
    const seoNode = container[0] as any;
    expect(seoNode).toBeDefined();

    // 2. WeatherHero check
    const heroNode = container[1] as any;
    expect(heroNode).toBeDefined();

    // 3. LocationSelector check
    const selectorNode = container[2] as any;
    expect(selectorNode.props.currentLocationName).toBe("New Delhi");

    // 4. Main content successful data layout check
    const mainNode = container[3] as any;
    expect(mainNode.props.className).toContain("flex-grow");

    const mainChildren = React.Children.toArray(mainNode.props.children);
    const successBlock = mainChildren[0] as any;
    expect(successBlock).toBeDefined();

    const successChildren = React.Children.toArray(successBlock.props.children);
    expect(successChildren.length).toBe(2);

    // successChildren[0] is WeatherAlert
    const alertNode = successChildren[0] as any;
    expect(alertNode.props.alerts).toBeDefined();

    // successChildren[1] is the main layout grid
    const gridNode = successChildren[1] as any;
    const gridChildren = React.Children.toArray(gridNode.props.children);
    expect(gridChildren.length).toBe(2);

    // Left Column
    const leftCol = gridChildren[0] as any;
    const leftChildren = React.Children.toArray(leftCol.props.children);
    expect(leftChildren.length).toBe(3); // WeatherCard, ForecastCard, RainChart

    // Right Column
    const rightCol = gridChildren[1] as any;
    const rightChildren = React.Children.toArray(rightCol.props.children);
    expect(rightChildren.length).toBe(2); // FarmingInsightCard, IrrigationCard

    // Verify FarmingInsightCard passes insights message key correctly
    const farmingInsightCard = rightChildren[0] as any;
    expect(farmingInsightCard.props.insights[0].messageKey).toBe("weather.insights.sprayOk");
  });

  it("should render loading state when weather data is fetching", () => {
    mockIsLoading = true;
    const element = WeatherPage({});
    const container = React.Children.toArray((element as any).props.children);
    const mainNode = container[3] as any;

    // Inside main, when isLoading is true, it renders the animated grid skeleton
    const mainChildren = React.Children.toArray(mainNode.props.children);
    const loadingSkeleton = mainChildren[0] as any;
    expect(loadingSkeleton.props.className).toContain("animate-pulse");
  });

  it("should render error state when fetch fails", () => {
    mockIsError = true;
    const element = WeatherPage({});
    const container = React.Children.toArray((element as any).props.children);
    const mainNode = container[3] as any;

    // Inside main, when isError is true, it renders the error message container
    const mainChildren = React.Children.toArray(mainNode.props.children);
    const errorBlock = mainChildren[0] as any;
    expect(errorBlock.props.className).toContain("bg-red-50");
    
    const errorTitle = errorBlock.props.children.find((c: any) => c.type === "h3");
    expect(errorTitle.props.children).toBe("weather.location.errorFetchFailed");
  });
});
