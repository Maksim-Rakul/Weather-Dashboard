import { formatDate, khelsi } from "./helpers";
import * as refs from "./refs";

export default function render({
  dt_txt,
  main: { temp, feels_like, pressure, humidity },
  visibility,
  wind: { speed },
  weather: [{ icon, main }],
}) {
  refs.todayIcon.children[0].href.baseVal = `./src/images/${icon}.svg`;
  refs.todayIcon.setAttribute("width", "135");
  refs.todayIcon.setAttribute("height", "135");

  refs.nowDate.textContent = formatDate(dt_txt);
  refs.temp.textContent = `${khelsi(temp)}°`;
  refs.typeWeather.textContent = main;
  refs.feelsTemp.textContent = khelsi(feels_like);
  refs.humidity.textContent = `${humidity}%`;
  refs.wind.textContent = `${speed}m/s`;
  refs.pressure.textContent = `${pressure}gPa`;
  refs.visibility.textContent = `${visibility / 1000} Kh`;
}
