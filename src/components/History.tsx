import { FC, memo } from "react";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { useHistorySearchStore, useWeatherStore } from "../store";
import shallow from "zustand/shallow";

const HistoryList: FC = () => {
  // Selected necessary states only from useHistorySearchStore.
  const { removeHistory, history } = useHistorySearchStore(
    (state) => ({
      removeHistory: state.removeHistory,
      history: state.history,
    }),
    shallow
  );
  // Selected necessary states only from useWeatherStore.
  const getWeather = useWeatherStore((state) => state.getWeather);

  return (
    <div className="my-5 divide-y divide-gray-300">
      <h2 className="text-xl font-bold pb-2">Search History</h2>
      <div className="py-2 divide-y divide-gray-300 ">
        {!history.length ? (
          <div className="p-5 text-center text-2xl text-gray-500 font-bold">
            No Record
          </div>
        ) : (
          history.map((item, index) => {
            const { id, city, country, date } = item;
            return (
              <div key={id} className="flex justify-between items-center py-2">
                <div className="flex justify-between flex-1">
                  <p>
                    {index + 1} {city}, {country}
                  </p>
                  <p className="hidden sm:inline">{date}</p>
                </div>
                <div className="flex gap-3 ml-3">
                  <button
                    className="rounded p-3 bg-gray-700 hover:bg-gray-900"
                    onClick={getWeather.bind(this, city, country)}
                  >
                    <FiSearch />
                  </button>
                  <button
                    className="rounded p-3 bg-gray-700 hover:bg-gray-900"
                    onClick={removeHistory.bind(this, id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// Using memo here to prevent child component rerender when parent states change.
export default memo(HistoryList);
