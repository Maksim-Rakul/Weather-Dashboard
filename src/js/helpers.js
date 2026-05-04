import { days, months } from "./const";
import * as refs from "./refs";
import { getFahrenheit } from "./storage";

export function formatDate(date) {
  const newDate = new Date(date);
  const dayOfWeek = days[newDate.getDay()];
  const dayOfMonth = newDate.getDate();
  const month = months[newDate.getMonth() + 1];

  return `${dayOfWeek}, ${dayOfMonth} ${month}`;
}

export function khelsi(temp) {
  const fahrenheit = getFahrenheit();

  if (fahrenheit === "") {
    return Math.floor(temp - 273.15);
  } else {
    return Math.floor((temp - 273.15) * 1.8 + 32);
  }
}

export function formatWeatherAerr(data) {
  const dataObj = data.list.filter(
    ({ dt_txt }) => dt_txt.split(" ")[1] === "15:00:00",
  );

  const daysOfWeek = dataObj.map((item) => {
    const date = new Date(item.dt_txt);
    return {
      day: days[date.getDay()],
      ...item,
    };
  });

  return daysOfWeek;
}

export function addFirstElementClass() {
  refs.daysList.children[0].classList.add("chosen_day");
}

export function showLoader() {
  refs.loader.classList.add("is-vissible");
}

export function hideLoader() {
  refs.loader.classList.remove("is-vissible");
}

export function showMessage() {
  refs.writeMessage.classList.add("is-vissible");
}

export function hideMessage() {
  refs.writeMessage.classList.remove("is-vissible");
}

export function converClouds(cloud) {
  if (cloud === 0) {
    return "clear";
  } else if (cloud >= 1 && cloud < 20) {
    return "mostly clear";
  } else if (cloud >= 20 && cloud < 50) {
    return "changeable cloudiness";
  } else if (cloud >= 50 && cloud < 90) {
    return "cloudy";
  } else {
    return "darkly";
  }
}