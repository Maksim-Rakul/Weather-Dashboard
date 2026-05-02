import { getWeater } from "./api";
import { addFirstElementClass, formatWeatherAerr } from "./helpers";
import * as refs from "./refs";
import { render, renderDays } from "./render";
import {
  clearWeatherStorage,
  getLocationStorage,
  getWeatherStorage,
  setLocationStorage,
  setWeatherStorage,
} from "./storage";

export async function handlerSubmit(event) {
  event.preventDefault();

  clearWeatherStorage();

  const cityName = event.target.elements.city.value.trim();
  const weather = await getWeater(cityName);

  const dateArr = formatWeatherAerr(weather);
  setWeatherStorage(dateArr);
  setLocationStorage(cityName);

  render(dateArr[0], cityName);
  renderDays(dateArr);
  addFirstElementClass();
}

export function dayClickHadler(event) {
  if (event.target.classList.contains("weather_days_list")) {
    return;
  }

  Array.from(refs.daysList.children).forEach((item) =>
    item.classList.remove("chosen_day"),
  );

  const parent = event.target.closest(".weather_days_item");
  const days = getWeatherStorage();
  const cityName = getLocationStorage();
  const chosenDay = days[+parent.dataset.id];
  render(chosenDay, cityName);
  parent.classList.add("chosen_day");
}