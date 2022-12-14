// define api response types, reference: https://openweathermap.org/current
export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: number;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// define api response error types,
export interface WeatherError {
  cod: string;
  message: string;
}

// define api fetch state types,
export interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string;
}

// define history data types,
export interface History {
  id: string;
  city: string;
  country: string;
  date: string;
}
