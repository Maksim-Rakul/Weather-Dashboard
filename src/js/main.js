import { getWeater } from "./api";

getWeater().then((data) => {
  console.log(data);
});
