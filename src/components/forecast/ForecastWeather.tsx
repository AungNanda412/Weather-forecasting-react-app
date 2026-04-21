import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import type { ForecastResponse } from "../../types/WeatherTypes";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type Props = {
  data: ForecastResponse;
};

const ForecastWeather = ({ data }: Props) => {
  const dayInAWeek = new Date().getDay();
  const forecastDay = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek),
  );

  return (
    <div className="w-full mx-auto mt-4">
      <label className="text-lg font-semibold text-gray-800 mb-2 block">
        Daily
      </label>

      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 mb-2 py-2 px-4 w-full">
                <div className="flex items-center justify-between w-full cursor-pointer">
                  <div className="flex items-center gap-4">
                    <img
                      src={`icons/${item?.weather[0].icon}.png`}
                      alt="weather"
                      className="w-10 h-10"
                    />

                    <div className="flex text-left items-center">
                      <span className="font-semibold text-sm text-gray-900">
                        {forecastDay[index]}
                      </span>
                    </div>
                  </div>

                  <div className="flex text-sm font-medium text-gray-800 gap-3">
                    <span className="text-sm capitalize">
                      {item?.weather[0].description}
                    </span>
                    <div className="text-gray-500">
                      {Math.round(item?.main.temp_min)}°C /{" "}
                      {Math.round(item?.main.temp_max)}°C
                    </div>
                  </div>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="mt-3 mb-3 text-sm text-gray-500">
                <div className="grid grid-cols-2 gap-y-2">
                  <div className="flex justify-between pr-4">
                    <span>Pressure</span>
                    <span className="text-gray-800 font-medium">
                      {item?.main.pressure} hPa
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Humidity</span>
                    <span className="text-gray-800 font-medium">
                      {item?.main.humidity}%
                    </span>
                  </div>

                  <div className="flex justify-between pr-4">
                    <span>Clouds</span>
                    <span className="text-gray-800 font-medium">
                      {item?.clouds.all}%
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Wind speed</span>
                    <span className="text-gray-800 font-medium">
                      {item?.wind.speed} m/s
                    </span>
                  </div>

                  <div className="flex justify-between pr-4">
                    <span>Sea level</span>
                    <span className="text-gray-800 font-medium">
                      {item?.main.sea_level} m
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Feels like</span>
                    <span className="text-gray-800 font-medium">
                      {Math.round(item?.main.feels_like)}°C
                    </span>
                  </div>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ForecastWeather;
