import { API_URL } from "@app/constants";
import axios, { AxiosRequestConfig } from "axios";

export const axiosConfig: AxiosRequestConfig = {
  baseURL: API_URL,
  timeout: 20000,
  responseType: "json",
};

const axiosBackendClient = axios.create(axiosConfig);

export default axiosBackendClient;
