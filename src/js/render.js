import { formatDate, khelsi } from "./helpers";
import * as refs from "./refs";
import { setLocationStorage } from "./storage";

let cityName;

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
  // refs.todayIcon.children[0].href.baseVal = `./src/images/weather_icons/${icon}.svg`;
  // refs.todayIcon.setAttribute("width", "135");
  // refs.todayIcon.setAttribute("height", "135");

  // refs.nowDate.textContent = formatDate(dt_txt);
  // refs.temp.textContent = `${khelsi(temp)}°`;
  // refs.typeWeather.textContent = main;
  // refs.feelsTemp.textContent = khelsi(feels_like);
  // refs.humidity.textContent = `${humidity}%`;
  // refs.wind.textContent = `${speed}m/s`;
  // refs.pressure.textContent = `${pressure}gPa`;
  // refs.visibility.textContent = `${visibility / 1000} Kh`;

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

                <p class="weather_today_item_value humidity"></p>
              </li>

              <li class="weather_today_item">
                <div class="weather_today_item_wrapper">
                  <svg class="weather_today_item_icon">
                    <use href="./src/images/wind.svg"></use>
                  </svg>
                  <p class="weather_today_item_type">Wind</p>
                </div>

                <p class="weather_today_item_value wind"></p>
              </li>

              <li class="weather_today_item">
                <div class="weather_today_item_wrapper">
                  <svg class="weather_today_item_icon">
                    <use href="./src/images/bar.svg"></use>
                  </svg>
                  <p class="weather_today_item_type">Pressure</p>
                </div>

                <p class="weather_today_item_value pressure"></p>
              </li>

              <li class="weather_today_item">
                <div class="weather_today_item_wrapper">
                  <svg class="weather_today_item_icon">
                    <use href="./src/images/sun.svg"></use>
                  </svg>
                  <p class="weather_today_item_type">Visibility</p>
                </div>

                <p class="weather_today_item_value visibility"></p>
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
  console.log(arr);

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

  console.log(renderStr);

  refs.daysList.innerHTML = renderStr;
}