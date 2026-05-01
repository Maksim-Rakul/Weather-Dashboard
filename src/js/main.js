import { getWeater } from "./api";
import { days } from "./const";
import { handlerSubmit } from "./handlers";
import { formatWeatherAerr } from "./helpers";
import * as refs from "./refs";
import render from "./render";

let day = 0;

getWeater().then((data) => {
  const dateArr = formatWeatherAerr(data);

  refs.nameOfCity.textContent = data.city.name;
  render(dateArr[day]);
});

refs.form.addEventListener("submit", handlerSubmit);
