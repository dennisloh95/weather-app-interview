import create from "zustand";
import { persist } from "zustand/middleware";
import { History, WeatherData, WeatherError } from "../types";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

interface WeatherStoreState {
  data: WeatherData | null;
  loading: boolean;
  error: string;
  getWeather: (city: string, country: string) => void;
  clearWeather: () => void;
  setLoading: () => void;
  setError: (err: string) => void;
}

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

interface HistoryStoreState {
  history: History[];
  addHistory: (history: History) => void;
  removeHistory: (id: string) => void;
}

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
