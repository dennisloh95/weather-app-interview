import { useState, FC, FormEvent } from "react";
import { useWeatherStore } from "../store";

interface SearchProps {
  title: string;
}

const Search: FC<SearchProps> = ({ title }) => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const { getWeather, setLoading } = useWeatherStore();

  const cityOnChange = (e: FormEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  };

  const countryOnChange = (e: FormEvent<HTMLInputElement>) => {
    setCountry(e.currentTarget.value);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim() === "") {
    }
    setLoading();
    getWeather(city, country);
  };

  const clearHandler = () => {
    setCity("");
    setCountry("");
  };

  return (
    <div className="w-full py-3 divide-y divide-black-300">
      <h1 className="text-2xl pb-3 font-bold">{title}</h1>
      <form
        className="py-3 flex align-items-center gap-2 justify-between flex-col md:flex-row"
        onSubmit={submitHandler}
      >
        <div className="flex items-center flex-2">
          <label htmlFor="city " className="w-16 md:w-auto">
            City:
          </label>
          <input
            name="city"
            type="text"
            className="border ml-2 p-1 flex-1"
            placeholder="City Name"
            value={city}
            onChange={cityOnChange}
          />
        </div>
        <div className="flex items-center flex-2">
          <label htmlFor="country" className="w-16 md:w-auto">
            Country:
          </label>
          <input
            name="country"
            type="text"
            className="border ml-2 p-1 flex-1"
            placeholder="Country Code"
            value={country}
            onChange={countryOnChange}
          />
        </div>
        <button className="border flex-1" type="submit">
          Search
        </button>
        <button className="border flex-1" type="button" onClick={clearHandler}>
          Clear
        </button>
      </form>
    </div>
  );
};

export default Search;
