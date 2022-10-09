import create from "zustand";
import { persist } from "zustand/middleware";
import { History, WeatherData, WeatherError } from "../types";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

// Using a small state management library: zustand to manage global state. Reference:https://github.com/pmndrs/zustand
// Make use of zustand persist to manage localstorage for history.
// Using uuid for history unique id.
// Using daysjs for date/time manipulation.

// Define WeatherStoreHook types
interface WeatherStoreState {
  data: WeatherData | null;
  loading: boolean;
  error: string;
  getWeather: (city: string, country: string) => void;
  clearWeather: () => void;
  setLoading: () => void;
  setError: (err: string) => void;
}

// Define useWeatherStore hook structure to manage weather fetching status.
const useWeatherStore = create<WeatherStoreState>((set, get) => ({
  data: null,
  loading: false,
  error: "",
  getWeather: async (city: string = "", country: string = "") => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      );
      if (!res.ok) {
        const resData: WeatherError = await res.json();
        throw new Error(resData.message);
      }
      const resData: WeatherData = await res.json();
      set({
        data: resData,
        loading: false,
        error: "",
      });
      useHistorySearchStore.getState().addHistory({
        id: uuidv4(),
        city: resData.name,
        country: resData.sys.country,
        date: dayjs().format("hh:mm:ss A"),
      });
    } catch (err) {
      get().setError((err as DOMException).message);
    }
  },
  clearWeather: () => {
    set(() => ({
      data: null,
      loading: false,
      error: "",
    }));
  },
  setLoading: () =>
    set(() => ({
      loading: true,
    })),
  setError: (err: string) =>
    set(() => ({
      data: null,
      loading: false,
      error: err,
    })),
}));

// Define HistoryStoreHook types
interface HistoryStoreState {
  history: History[];
  addHistory: (history: History) => void;
  removeHistory: (id: string) => void;
}

// Define useHistorySearchStore hook structure to manage history state, using persist here as I think it can improve this way like google search history behaviour.
const useHistorySearchStore = create<HistoryStoreState>()(
  persist(
    (set) => ({
      history: [],
      addHistory: (data: History) => {
        set((state) => ({ history: [...state.history, data] }));
      },
      removeHistory: (id: string) => {
        set((state) => ({
          history: state.history.filter((item) => item.id !== id),
        }));
      },
    }),
    {
      name: "search-history",
    }
  )
);

export { useWeatherStore, useHistorySearchStore };
