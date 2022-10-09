import { useState, FC, FormEvent, memo } from "react";
import { useWeatherStore } from "../store";
import shallow from "zustand/shallow";

const Search: FC = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  // Selected necessary states only from useWeatherStore.
  const { getWeather, setLoading, setError, clearWeather } = useWeatherStore(
    (state) => ({
      getWeather: state.getWeather,
      setLoading: state.setLoading,
      setError: state.setError,
      clearWeather: state.clearWeather,
    }),
    shallow
  );

  const cityOnChange = (e: FormEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  };

  const countryOnChange = (e: FormEvent<HTMLInputElement>) => {
    setCountry(e.currentTarget.value);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim() === "" && country.trim() === "") {
      setError("Please insert City and/or Country Code");
      return;
    }
    setLoading();
    getWeather(city, country);
  };

  const clearHandler = () => {
    setCity("");
    setCountry("");
    clearWeather();
  };

  return (
    <div className="w-full py-3 divide-y divide-gray-300">
      <h1 className="text-2xl pb-3 font-bold">Today's Weather</h1>
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
            className=" ml-2 p-2 flex-1 bg-gray-700 border-none focus:outline-none"
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
            className=" ml-2 p-2 flex-1 bg-gray-700 border-none focus:outline-none"
            placeholder="Country Code"
            value={country}
            onChange={countryOnChange}
          />
        </div>
        <button
          className="min-h-[40px]  flex-1 bg-indigo-600 hover:bg-indigo-700 "
          type="submit"
        >
          Search
        </button>
        <button
          className="min-h-[40px]  flex-1 bg-rose-600 hover:bg-rose-700 "
          type="button"
          onClick={clearHandler}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

// Using memo here to prevent child component rerender when parent states change.
export default memo(Search);
