import { getWeater } from "./api";
import { days } from "./const";
import {
  changeTheme,
  dayClickHadler,
  degreeClick,
  handleLoc,
  handlerSubmit,
} from "./handlers";
import { hideLoader, hideMessage, showLoader, showMessage } from "./helpers";
import * as refs from "./refs";
import {
  render,
  renderDays,
  renderMainContainer,
  renderValues,
} from "./render";
import {
  getFahrenheit,
  getLocationStorage,
  getTheme,
  setLocationStorage,
  setWeatherStorage,
} from "./storage";

const cityName = getLocationStorage();

if (getTheme() !== "") {
  refs.body.classList.add("theme-light");
}

if (getFahrenheit() !== "") {
  refs.fahrenheit.classList.toggle("checked");
  refs.celsius.classList.toggle("checked");
  refs.switcherInput.checked = true;
}

hideLoader();

if (cityName === "") {
  showMessage();
} else {
  hideMessage();

  showLoader();

  getWeater(cityName)
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

refs.form.addEventListener("submit", handlerSubmit);
refs.daysList.addEventListener("click", dayClickHadler);

refs.switcherTheme.addEventListener("click", changeTheme);
refs.switcherDegree.addEventListener("click", degreeClick);
refs.searchByLocationBtn.addEventListener("click", handleLoc);
