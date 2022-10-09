import { FC } from "react";
import Search from "./components/Search";
import Weather from "./components/Weather";
import { useWeatherStore } from "./store";
import History from "./components/History";
import shallow from "zustand/shallow";

const App: FC = () => {
  const { data, loading, error } = useWeatherStore(
    (state) => ({
      data: state.data,
      loading: state.loading,
      error: state.error,
    }),
    shallow
  );

  return (
    <div className="container mx-auto px-4 min-h-screen text-gray-100">
      <Search />
      <div className="min-h-[250px] flex items-center">
        {loading ? (
          <div className="font-bold text-2xl text-gray-500 text-center py-5 text-center w-full">
            loading...{" "}
          </div>
        ) : error ? (
          <p className="font-bold text-2xl text-rose-600 text-center py-5 capitalize text-center w-full">
            {error}
          </p>
        ) : data ? (
          <Weather data={data} />
        ) : (
          <div className="font-bold text-2xl text-gray-500 text-center py-5 text-center w-full">
            Search Weather by insert City and/or Country Code
          </div>
        )}
      </div>
      <History />
    </div>
  );
};

export default App;
