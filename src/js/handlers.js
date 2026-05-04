import "izitoast/dist/css/iziToast.min.css";
import iziToast from "izitoast";

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
import {
  render,
  renderDays,
  renderMainContainer,
  renderValues,
} from "./render";
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

  const cityName = event.target.elements.city.value.trim();

  if (cityName === "") {
    iziToast.error({
      title: "Please write your city",
    });

    return;
  }
  hideMessage();
  showLoader();

  try {
    const weather = await getWeater(cityName);

    if (!weather) {
      iziToast.error({
        title: "Sorry, we don't find your city",
      });
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
  const weather = getWeatherStorage();
  const location = getLocationStorage();

  if (getFahrenheit() === "") {
    console.log(getFahrenheit());

    refs.fahrenheit.classList.add("checked");
    refs.celsius.classList.remove("checked");

    setFahrenheit();
    render(weather[0], location);
    renderDays(weather);
    addFirstElementClass();
  } else {
    refs.fahrenheit.classList.remove("checked");
    refs.celsius.classList.add("checked");
    cleareFahrenheit();
    render(weather[0], location);

    renderDays(weather);
    addFirstElementClass();
  }
}

export function handleLoc() {
  hideMessage();
  showLoader();
  navigator.geolocation.getCurrentPosition(success, error, options);
}

async function success(pos) {
  const { latitude, longitude } = await pos.coords;
  const data = getWeater("", latitude, longitude);

  data
    .then((data) => {
      renderMainContainer(data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      hideLoader();
    });
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  hideLoader();
  iziToast.error({
    title: "Geolocation does not supported by this browser",
  });
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
