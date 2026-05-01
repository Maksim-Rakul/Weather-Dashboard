import axios from "axios";
import { API_KEY } from "./const";

export async function getWeater() {
  try {
    const response = await axios(
      `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${API_KEY}&q=London`,
    );
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}
