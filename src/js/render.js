import {
  converClouds,
  convertVisibility,
  convertWind,
  formatDate,
  formatWeatherAerr,
  khelsi,
} from "./helpers";
import * as refs from "./refs";
import { setLocationStorage, setWeatherStorage } from "./storage";

export function render(
  {
    dt_txt,
    main: { temp, feels_like, pressure, humidity },
    visibility,
    wind: { speed },
    weather: [{ icon, main }],
  },
  name,
) {
  console.log(dt_txt);

  const mainRender = `
    <div class="weather_today">
            <h2 class="weather_today_city">${name}</h2>
            <p class="weather_today_date">${formatDate(dt_txt)}</p>

            <div class="weather_today_degree">
              <svg class="weather_today_icon">
                <use class="js-today-icon" href="./src/images/weather_icons/${icon}.svg"></use>
              </svg>
              <div class="weather_today_degree_wrapper">
                <p class="weather_today_temp">${khelsi(temp)}°</p>
                <p class="weather_today_type"></p>
                <p class="weather_today_feels">Feels like <span class="js-feels">${khelsi(feels_like)}</span>°</p>
              </div>
            </div>

            <ul class="weather_today_list">
              <li class="weather_today_item">
                <div class="weather_today_item_wrapper">
                  <svg class="weather_today_item_icon">
                    <use href="./src/images/water.svg"></use>
                  </svg>
                  <p class="weather_today_item_type">Humidity</p>
                </div>

                <p class="weather_today_item_value humidity">${humidity} %</p>
              </li>

              <li class="weather_today_item">
                <div class="weather_today_item_wrapper">
                  <svg class="weather_today_item_icon">
                    <use href="./src/images/wind.svg"></use>
                  </svg>
                  <p class="weather_today_item_type">Wind</p>
                </div>

                <p class="weather_today_item_value wind">${speed} m/s</p>
              </li>

              <li class="weather_today_item">
                <div class="weather_today_item_wrapper">
                  <svg class="weather_today_item_icon">
                    <use href="./src/images/bar.svg"></use>
                  </svg>
                  <p class="weather_today_item_type">Pressure</p>
                </div>

                <p class="weather_today_item_value pressure">${pressure} hPa</p>
              </li>

              <li class="weather_today_item">
                <div class="weather_today_item_wrapper">
                  <svg class="weather_today_item_icon">
                    <use href="./src/images/sun.svg"></use>
                  </svg>
                  <p class="weather_today_item_type">Visibility</p>
                </div>

                <p class="weather_today_item_value visibility">${visibility / 1000} km</p>
              </li>
            </ul>

            <div class="time">
              <p>08:20</p>
              <p>22:20</p>
            </div>
          </div>
  `;

  refs.weatherToday.innerHTML = mainRender;
}

export function renderDays(arr) {
  const renderStr = arr
    .map(
      ({ day, weather: [{ icon }], main: { temp_max, temp_min } }, index) => {
        return `
      <li class="weather_days_item" data-id=${index}>
        <p class="weather_days_day">${day}</p>
        <svg class="weather_days_icon">
          <use href="./src/images/weather_icons/${icon}.svg"></use>
        </svg>
        <p class="weather_days_temp"><span class="js-weather_days_temp">${khelsi(temp_max)}</span>°</p>
        <p class="weather_days_feel"><span class="js-weather_days_feel">${khelsi(temp_min)}</span>°</p>
      </li>
    `;
      },
    )
    .join("");

  refs.daysList.innerHTML = renderStr;
}

export function renderValues({
  main: { humidity },
  visibility,
  wind: { speed },
  clouds: { all },
}) {
  const renderStr = `
    <li class="values_item">
      <div class="values_subtitle_wrapper">
        <svg class="values_icon">
          <use href="./src/images/weather_icons/50d.svg"></use>
        </svg>
        <h3 class="values_subtitle">Wind</h3>
      </div>
      <p class="values_val">${speed}</p>
      <p class="values_type">m/s</p>
      <p>${convertWind(speed)}</p>
    </li>

    <li class="values_item">
      <div class="values_subtitle_wrapper">
        <svg class="values_icon">
          <use href="./src/images/water.svg"></use>
        </svg>
        <h3 class="values_subtitle">Humidity</h3>
      </div>
      <p class="values_val">${humidity}</p>
      <p class="values_type">%</p>

      <progress id="file" value="${humidity}" max="100">  </progress>
    </li>

    <li class="values_item">
      <div class="values_subtitle_wrapper">
        <svg class="values_icon">
          <use href="./src/images/weather_icons/01d.svg"></use>
        </svg>
        <h3 class="values_subtitle">Visibility</h3>
      </div>
      <p class="values_val">${visibility / 1000}</p>
      <p class="values_type">km</p>
      <p>${convertVisibility(visibility)}</p>
    </li>

    <li class="values_item">
      <div class="values_subtitle_wrapper">
        <svg class="values_icon">
          <use href="./src/images/weather_icons/04d.svg"></use>
        </svg>
        <h3 class="values_subtitle">Cloudiness</h3>
      </div>
      <p class="values_val">${all}</p>
      <p class="values_type">%</p>
      <p>${converClouds(all)}</p>
    </li>
  `;

  refs.valuesList.innerHTML = renderStr;
}

export function renderMainContainer(data) {
  const dateArr = formatWeatherAerr(data);
  setWeatherStorage(dateArr);
  setLocationStorage(data.city.name);

  refs.weatherInfo.classList.add("is-vissible");
  render(dateArr[0], data.city.name);
  renderDays(dateArr);
  renderValues(dateArr[0]);

  refs.daysList.children[0].classList.add("chosen_day");
}
