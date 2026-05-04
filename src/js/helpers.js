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
    return "Сlear";
  } else if (cloud >= 1 && cloud < 20) {
    return "Mostly clear";
  } else if (cloud >= 20 && cloud < 50) {
    return "Changeable cloudiness";
  } else if (cloud >= 50 && cloud < 90) {
    return "Cloudy";
  } else {
    return "Darkly";
  }
}

export function convertWind(speed) {
  if (speed === 0) {
    return "Calm";
  } else if (speed >= 1 && speed < 2) {
    return "Light air";
  } else if (speed >= 2 && speed < 4) {
    return "Light breeze";
  } else if (speed >= 4 && speed < 7) {
    return "Gentle breeze";
  } else if (speed >= 7 && speed < 11) {
    return "Moderate breeze";
  } else if (speed >= 11 && speed < 16) {
    return "Fresh breeze";
  } else if (speed >= 16 && speed < 21) {
    return "Strong breeze";
  } else if (speed >= 21 && speed < 27) {
    return "High wind";
  } else if (speed >= 27 && speed < 33) {
    return "Gale";
  } else if (speed >= 33 && speed < 40) {
    return "Strong gale";
  } else if (speed >= 40 && speed < 48) {
    return "Storm";
  } else {
    return "Hurricane";
  }
}

export function convertVisibility(visibility) {
  if (visibility === 0) {
    return "No visibility";
  } else if (visibility >= 1 && visibility < 1000) {
    return "Very poor";
  } else if (visibility >= 1000 && visibility < 2000) {
    return "Poor";
  } else if (visibility >= 2000 && visibility < 5000) {
    return "Moderate";
  } else if (visibility >= 5000 && visibility < 10000) {
    return "Good";
  } else {
    return "Excellent";
  }
}