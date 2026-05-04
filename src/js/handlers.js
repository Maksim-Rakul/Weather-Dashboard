import { getWeater } from "./api";
import {
  addFirstElementClass,
  formatWeatherAerr,
  hideLoader,
  hideMessage,
  showLoader,
  showMessage,
} from "./helpers";
import * as refs from "./refs";
import { render, renderDays, renderValues } from "./render";
import {
  cleareFahrenheit,
  cleareTheme,
  clearWeatherStorage,
  getFahrenheit,
  getLocationStorage,
  getTheme,
  getWeatherStorage,
  setFahrenheit,
  setLightTheme,
  setLocationStorage,
  setWeatherStorage,
} from "./storage";

export async function handlerSubmit(event) {
  event.preventDefault();
  showLoader();
  hideMessage();

  const cityName = event.target.elements.city.value.trim();
  try {
    const weather = await getWeater(cityName);

    if (!weather) {
      alert("We don't find it");
      return;
    }

    refs.weatherInfo.classList.add("is-vissible");

    const dateArr = formatWeatherAerr(weather);
    setWeatherStorage(dateArr);
    setLocationStorage(cityName);

    render(dateArr[0], cityName);
    renderDays(dateArr);
    renderValues(dateArr[0]);

    addFirstElementClass();
  } catch (error) {
    console.log(error.message);
  } finally {
    hideLoader();
  }

  event.target.reset();
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
  renderValues(chosenDay);

  parent.classList.add("chosen_day");
}

export function changeTheme() {
  refs.body.classList.toggle("theme-light");

  if (getTheme() === "") {
    setLightTheme();
  } else {
    cleareTheme();
  }
}

export function degreeClick() {
  refs.celsius.classList.toggle("checked");
  refs.fahrenheit.classList.toggle("checked");

  if (refs.fahrenheit.classList.contains("checked")) {
    console.log("f");
  } else {
    console.log("c");
  }

  if (getFahrenheit() === "") {
    setFahrenheit();
    renderDays(getWeatherStorage());
    addFirstElementClass();
  } else {
    cleareFahrenheit();
    renderDays(getWeatherStorage());
    addFirstElementClass();
  }
}
