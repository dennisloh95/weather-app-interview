import React, { FC } from "react";
import { History } from "../types";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { useHistorySearchStore, useWeatherStore } from "../store";

interface HistoryProps {
  history: History[];
}

const HistoryList: FC<HistoryProps> = ({ history }) => {
  const { removeHistory } = useHistorySearchStore();
  const { getWeather } = useWeatherStore();

  return (
    <div className="my-5 max-h-96 overflow-scroll divide-y divide-black-300">
      <h2 className="text-xl font-bold pb-2">Search History</h2>
      <div className="py-2">
        {history.map((item, index) => (
          <div key={item.id} className="flex justify-between items-center py-2">
            <div className="flex justify-between flex-1">
              <h1>
                {index + 1} {item.city}, {item.country}
              </h1>
              <p className="hidden sm:inline">{item.date}</p>
            </div>
            <div className="flex gap-3 ml-3">
              <button
                className="rounded p-3 bg-red-100"
                onClick={getWeather.bind(this, item.city, item.country)}
              >
                <FiSearch />
              </button>
              <button
                className="rounded p-3 bg-red-100"
                onClick={removeHistory.bind(this, item.id)}
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
