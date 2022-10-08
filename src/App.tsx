import { useState, FC } from "react";
import Search from "./components/Search";
import Weather from "./components/Weather";
import { useHistorySearchStore, useWeatherStore } from "./store";
import History from "./components/History";

const App: FC = () => {
  const { data, loading, error } = useWeatherStore();
  const { history } = useHistorySearchStore();
  return (
    <div className="container mx-auto px-4">
      <Search title="Today's Weather" />
      {loading ? <p>loading...</p> : data && <Weather data={data} />}
      {error && <p>{error}</p>}
      <History history={history} />
    </div>
  );
};

export default App;
