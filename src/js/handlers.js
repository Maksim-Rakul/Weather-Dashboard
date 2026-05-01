import { getWeater } from "./api";
import { formatWeatherAerr } from "./helpers";
import * as refs from "./refs";
import render from "./render";

export async function handlerSubmit(event) {
  event.preventDefault();

  const cityName = event.target.elements.city.value.trim();
  const weather = await getWeater(cityName);

  const dateArr = formatWeatherAerr(weather);
  console.log(dateArr);

  refs.nameOfCity.textContent = weather.city.name;
  render(dateArr[0]);

  console.log(dateArr);
}
