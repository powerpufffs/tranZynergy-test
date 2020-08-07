import axios from "axios";

export const randomUserAxios = axios.create({
  baseURL: "https://randomuser.me/api/",
});

export default randomUserAxios;
