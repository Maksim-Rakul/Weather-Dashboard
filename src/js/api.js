import axios from "axios";
import { API_KEY } from "./const";
import iziToast from "izitoast";

export async function getWeater(cityName = "Kyiv", lat = "", lon = "") {
  try {
    const response = await axios(
      `https://api.openweathermap.org/data/2.5/forecast?id=524901&exclude=hourly`,
      {
        params: {
          appid: API_KEY,
          q: cityName,
          lat,
          lon,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    
  }
}
