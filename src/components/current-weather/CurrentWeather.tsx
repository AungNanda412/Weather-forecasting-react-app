import type { WeatherResponse } from "../../types/WeatherTypes";

type Props = {
  data: WeatherResponse;
};

const CurrentWeather = ({ data }: Props) => {
  return (
    <div
      className="
        max-w-sm w-full mx-auto mt-6
        rounded-2xl shadow-lg
        bg-linear-to-br from-gray-800 to-gray-900
        px-6 py-5 text-white
      "
    >
      
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-xl font-semibold">{data?.city}</p>
          <p className="text-sm text-gray-300">{data?.weather[0].description}</p>
        </div>
        <img className="w-20 h-20" src={`/icons/${data?.weather[0].icon}.png`} alt="weather" />
      </div>

      
      <div className="flex items-center gap-10">
        <p className="text-6xl font-bold">{Math.round(data?.main.temp)}°C</p>

        <div className="flex-1 text-sm space-y-1">
          <p className="font-semibold text-gray-300 mb-1">Details</p>

          <div className="flex justify-between">
            <span>Feels like</span>
            <span>{Math.round(data?.main.feels_like)}°C</span>
          </div>

          <div className="flex justify-between">
            <span>Wind</span>
            <span>{data?.wind.speed} m/s</span>
          </div>

          <div className="flex justify-between">
            <span>Humidity</span>
            <span>{data?.main.humidity}%</span>
          </div>

          <div className="flex justify-between">
            <span>Pressure</span>
            <span>{data?.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
