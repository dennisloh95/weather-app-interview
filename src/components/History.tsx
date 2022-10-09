import { FC } from "react";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { useHistorySearchStore, useWeatherStore } from "../store";

const HistoryList: FC = () => {
  const { removeHistory, history } = useHistorySearchStore();
  const { getWeather } = useWeatherStore();

  return (
    <div className="my-5 divide-y divide-gray-300">
      <h2 className="text-xl font-bold pb-2">Search History</h2>
      <div className="py-2 divide-y divide-gray-300 ">
        {!history.length ? (
          <div className="p-5 text-center text-2xl text-gray-500 font-bold">
            No Record
          </div>
        ) : (
          history.map((item, index) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-2"
            >
              <div className="flex justify-between flex-1">
                <h1>
                  {index + 1} {item.city}, {item.country}
                </h1>
                <p className="hidden sm:inline">{item.date}</p>
              </div>
              <div className="flex gap-3 ml-3">
                <button
                  className="rounded p-3 bg-gray-700 hover:bg-gray-900"
                  onClick={getWeather.bind(this, item.city, item.country)}
                >
                  <FiSearch />
                </button>
                <button
                  className="rounded p-3 bg-gray-700 hover:bg-gray-900"
                  onClick={removeHistory.bind(this, item.id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryList;
