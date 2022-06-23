import { API_URL } from "@app/constants";
import axiosBackendClient from "../axios/axios-client";
import { CheeseControllerApi, Configuration } from "./generated";

const configuration: Configuration = {
  basePath: API_URL,
  isJsonMime: () => false,
};

export const cheeseApi = new CheeseControllerApi(configuration, undefined, axiosBackendClient);
