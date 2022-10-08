import { FC } from "react";
import { WeatherData } from "../types";
import dayjs from "dayjs";

interface WeatherProps {
  data: WeatherData;
}

const Weather: FC<WeatherProps> = ({ data }) => {
  return (
    <div className="min-h-52">
      <p>
        {data.name}, {data.sys.country}
      </p>
      <p className="text-2xl">{data.weather[0].main}</p>
      <div>
        <div className="flex">
          <div>Description: </div>
          <div>{data.weather[0].description}</div>
        </div>
        <div className="flex">
          <div>Temperature: </div>
          <div>{`${data.main.temp_min}°C ~ ${data.main.temp_min}°C`} </div>
        </div>
        <div className="flex">
          <div>Humidity: </div>
          <div>{data.main.humidity}%</div>
        </div>
        <div className="flex">
          <div>Time: </div>
          <div>{dayjs.unix(data.dt).format("YYYY-MM-DD hh:mm A")}</div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
