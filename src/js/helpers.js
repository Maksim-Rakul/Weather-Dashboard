import { days, months } from "./const";

export function formatDate(date) {
  const newDate = new Date(date);
  const dayOfWeek = days[newDate.getDay()];
  const dayOfMonth = newDate.getDate();
  const month = months[newDate.getMonth() + 1];

  return `${dayOfWeek}, ${dayOfMonth} ${month}`;
}

export function khelsi(temp) {
  return Math.floor(temp - 273.15);
}

export function formatWeatherAerr(data) {
  const dataObj = data.list.filter(
    ({ dt_txt }) => dt_txt.split(" ")[1] === "15:00:00",
  );

  const daysOfWeek = dataObj.map((item) => {
    const date = new Date(item.dt_txt);
    return {
      day: days[date.getDay()],
      ...item,
    };
  });

  return daysOfWeek;
}
