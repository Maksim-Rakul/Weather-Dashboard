import axios from "axios";
import { API_KEY } from "./const";

export async function getWeater(cityName = "Kyiv") {
  try {
    const response = await axios(
      `http://api.openweathermap.org/data/2.5/forecast?id=524901&exclude=hourly&appid=${API_KEY}&q=${cityName}`,
    );
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}
