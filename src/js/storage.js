import { LOCATION_KEY, WEATHER_KEY } from "./const";

export function getWeatherStorage() {
  return JSON.parse(localStorage.getItem(WEATHER_KEY)) || [];
}

export function setWeatherStorage(weather) {
  localStorage.setItem(WEATHER_KEY, JSON.stringify(weather));
}

export function clearWeatherStorage() {
  localStorage.removeItem(WEATHER_KEY);
}

export function getLocationStorage() {
  return JSON.parse(localStorage.getItem(LOCATION_KEY)) || "";
}

export function setLocationStorage(location) {
  localStorage.setItem(LOCATION_KEY, JSON.stringify(location));
}

export function clearLocationStorage() {
  localStorage.removeItem(LOCATION_KEY);
}
