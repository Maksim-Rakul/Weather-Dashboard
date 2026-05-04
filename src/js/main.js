import { getWeater } from "./api";
import { days } from "./const";
import {
  changeTheme,
  dayClickHadler,
  degreeClick,
  handlerSubmit,
} from "./handlers";
import {
  formatWeatherAerr,
  hideLoader,
  hideMessage,
  showLoader,
  showMessage,
} from "./helpers";
import * as refs from "./refs";
import { render, renderDays, renderValues } from "./render";
import { getLocationStorage, getTheme, setWeatherStorage } from "./storage";

const cityName = getLocationStorage();

if (getTheme() !== "") {
  refs.body.classList.add("theme-light");
}

hideLoader();

if (cityName === "") {
  showMessage();
} else {
  hideMessage();

  showLoader();

  getWeater(cityName)
    .then((data) => {
      console.log(data);

      const dateArr = formatWeatherAerr(data);
      setWeatherStorage(dateArr);

      refs.weatherInfo.classList.add("is-vissible");
      render(dateArr[0], data.city.name);
      renderDays(dateArr);
      renderValues(dateArr[0]);

      refs.daysList.children[0].classList.add("chosen_day");
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      hideLoader();
    });
}

refs.form.addEventListener("submit", handlerSubmit);
refs.daysList.addEventListener("click", dayClickHadler);

refs.switcherTheme.addEventListener("click", changeTheme);
refs.switcherDegree.addEventListener("click", degreeClick);