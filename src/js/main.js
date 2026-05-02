import { getWeater } from "./api";
import { days } from "./const";
import { dayClickHadler, handlerSubmit } from "./handlers";
import { formatWeatherAerr } from "./helpers";
import * as refs from "./refs";
import { render, renderDays } from "./render";
import { getLocationStorage, setWeatherStorage } from "./storage";

let day = 0;
const cityName = getLocationStorage();

getWeater(cityName).then((data) => {
  const dateArr = formatWeatherAerr(data);

  setWeatherStorage(dateArr);

  render(dateArr[day], data.city.name);
  renderDays(dateArr);

  refs.daysList.children[0].classList.add("chosen_day");
  refs.daysList.addEventListener("click", dayClickHadler);
});

refs.form.addEventListener("submit", handlerSubmit);
