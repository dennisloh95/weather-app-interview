import { FC } from "react";
import { WeatherData } from "../types";
import dayjs from "dayjs";

interface WeatherProps {
  data: WeatherData;
}

const Weather: FC<WeatherProps> = ({
  data: {
    main: { temp_max, temp_min, humidity },
    name,
    dt,
    sys: { country },
    weather: [{ main, description, icon }],
  },
}) => {
  return (
    <div className="">
      <p className="text-gray-200">
        {name}, {country}
      </p>
      <div className="flex">
        <p className="text-6xl font-bold py-3">{main}</p>
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="weather icon"
          className="w-12 h-12"
        />
      </div>
      <div>
        <div className="flex">
          <p className="text-gray-200 w-36 capitalize">Description: </p>
          <p className="capitalize">{description}</p>
        </div>
        <div className="flex">
          <p className="text-gray-200 w-36">Temperature: </p>
          <p>{`${temp_min}°C ~ ${temp_max}°C`} </p>
        </div>
        <div className="flex">
          <p className="text-gray-200 w-36">Humidity: </p>
          <p>{humidity}%</p>
        </div>
        <div className="flex">
          <p className="text-gray-200 w-36">Time: </p>
          <p>{dayjs.unix(dt).format("YYYY-MM-DD hh:mm A")}</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
