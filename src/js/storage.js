import { FAHRENHEIT_KEY, LOCATION_KEY, THEME_KEY, WEATHER_KEY } from "./const";

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

export function setLightTheme() {
  localStorage.setItem(THEME_KEY, JSON.stringify("light"));
}

export function getTheme() {
  return JSON.parse(localStorage.getItem(THEME_KEY)) || "";
}

export function cleareTheme() {
  localStorage.removeItem(THEME_KEY);
}

export function setFahrenheit() {
  localStorage.setItem(FAHRENHEIT_KEY, JSON.stringify("fahrenheit"));
}

export function getFahrenheit() {
  return JSON.parse(localStorage.getItem(FAHRENHEIT_KEY)) || "";
}

export function cleareFahrenheit() {
  localStorage.removeItem(FAHRENHEIT_KEY);
}
