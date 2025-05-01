import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.0.19:3000/api", // ou a URL do deploy depois
});
