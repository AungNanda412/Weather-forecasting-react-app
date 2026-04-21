import { useEffect, useState } from "react";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Search, { type SearchOption } from "./components/search/search";
import "./index.css";
import {
  getCurrentLocation,
  weatherApiKey,
  weatherApiUrl,
  weatherGeoApiUrl,
} from "./services/searchService";
import type { ForecastResponse, WeatherResponse } from "./types/WeatherTypes";
import { Loader2 } from "lucide-react";
import ForecastWeather from "./components/forecast/ForecastWeather";

function App() {
  const [currentWeather, setCurrentWeather] = useState<WeatherResponse>();
  const [forecast, setForecast] = useState<ForecastResponse>();

useEffect(() => {
  const fetchDefaultWeather = async () => {
    try {
      const { curLat, curLon } = await getCurrentLocation();

      
      const geoRes = await fetch(
        `${weatherGeoApiUrl}/reverse?lat=${curLat}&lon=${curLon}&limit=1&appid=${weatherApiKey}`
      );

      const geoData = await geoRes.json();

      const cityName =
        geoData?.[0]?.name && geoData?.[0]?.country
          ? `${geoData[0].name}, ${geoData[0].country}`
          : "Your Location";

      
      const currentWeatherFetch = await fetch(
        `${weatherApiUrl}/weather?lat=${curLat}&lon=${curLon}&appid=${weatherApiKey}&units=metric`
      );

      const forecastFetch = await fetch(
        `${weatherApiUrl}/forecast?lat=${curLat}&lon=${curLon}&appid=${weatherApiKey}&units=metric`
      );

      const weatherRes = await currentWeatherFetch.json();
      const forecastRes = await forecastFetch.json();

      setCurrentWeather({ city: cityName, ...weatherRes });
      setForecast({ city: cityName, ...forecastRes });

    } catch (error) {
      console.error("Location fetch failed:", error);
    }
  };

  fetchDefaultWeather();
}, []);

  

  const handleOnSearchChange = async (searchData: SearchOption | null): Promise<void> => {

    if (!searchData) return;
    
    const [lat, lon] = searchData.value.split(" ");

    // const { curLat, curLon } = await getCurrentLocation();



    // const currentWeatherFetch = fetch(
    //   `${weatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`,
    // );
    // const forecastFetch = fetch(
    //   `${weatherApiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`,
    // );

    // Promise.all([currentWeatherFetch, forecastFetch])
    //   .then(async (respond: any) => {
    //     const weatherRes = await respond[0].json();
    //     const forecastRes = await respond[1].json();

    // setCurrentWeather({ city: searchData.label, ...weatherRes });
    // setForecast({ city: searchData.label, ...forecastRes });
    //   })
    //   .catch((err) => console.log(err));

    try {
      const currentWeatherFetch = await fetch(
        `${weatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`,
      );

      const forecastFetch = await fetch(
        `${weatherApiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`,
      );

      const weatherRes = await currentWeatherFetch.json();
      const forecastRes = await forecastFetch.json();

      setCurrentWeather({ city: searchData.label, ...weatherRes });
      setForecast({ city: searchData.label, ...forecastRes });
    } catch (err:unknown) {
      console.error("Error fetching weather data:", err);
    }
  };

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container mx-auto lg:px-10">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather ? <CurrentWeather data={currentWeather} /> : <div className="flex justify-center items-center mt-30"><Loader2 size={35} className="animate-spin" /></div> }
      {forecast && <ForecastWeather data={forecast} />}
    </div>
  );
}

export default App;
