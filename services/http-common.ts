import axios, { AxiosInstance } from "axios";

axios.defaults.headers["Content-Type"] = "application/json";
const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3002/api",
  // baseURL: "https://ragan-node.herokuapp.com/api",
});

export default apiClient;
