import { FC } from "react";
import { WeatherData } from "../types";
import dayjs from "dayjs";

interface WeatherProps {
  data: WeatherData;
}

const Weather: FC<WeatherProps> = ({ data }) => {
  return (
    <div className="">
      <p className="text-gray-200">
        {data.name}, {data.sys.country}
      </p>
      <div className="flex">
        <p className="text-6xl font-bold py-3">{data.weather[0].main}</p>
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="weather icon"
          className="w-12 h-12"
        />
      </div>
      <div>
        <div className="flex">
          <p className="text-gray-200 w-36 capitalize">Description: </p>
          <p className="capitalize">{data.weather[0].description}</p>
        </div>
        <div className="flex">
          <p className="text-gray-200 w-36">Temperature: </p>
          <p>{`${data.main.temp_min}°C ~ ${data.main.temp_min}°C`} </p>
        </div>
        <div className="flex">
          <p className="text-gray-200 w-36">Humidity: </p>
          <p>{data.main.humidity}%</p>
        </div>
        <div className="flex">
          <p className="text-gray-200 w-36">Time: </p>
          <p>{dayjs.unix(data.dt).format("YYYY-MM-DD hh:mm A")}</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
