export type WeatherResponse = {
  base: string;
  city: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  dt: number;
  id: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity?: number;
  };
  name: string;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  visibility: number;
  weather: {
    id?: number;
    main?: string;
    description?: string;
    icon?: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
};


export type ForecastResponse = {
  cod: string; // "200"
  message: number;
  cnt: number;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
  list: ForecastItem[];
};

type ForecastItem = {
  dt: number;
  dt_txt: string;

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    temp_kf: number;
    grnd_level: number;
    sea_level: number;
  };

  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];

  clouds: {
    all: number;
  };

  wind: {
    speed: number;
    deg: number;
    gust: number;
  };

  visibility: number;
  pop: number;

  sys: {
    pod: "d" | "n"; // day or night
  };

  rain?: {
    "3h": number;
  };

  snow?: {
    "3h": number;
  };
};