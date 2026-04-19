import { useState } from "react";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Search, { type SearchOption } from "./components/search/search";
import "./index.css";
import {
  weatherApiKey,
  weatherApiUrl,
} from "./services/searchService";
import type { WeatherResponse } from "./types/WeatherTypes";

function App() {
  const [currentWeather, setCurrentWeather] = useState<WeatherResponse>();
  const [forecast, setForecast] = useState();

  

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
    <div className="container mx-auto">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
    </div>
  );
}

export default App;
