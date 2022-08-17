import axios from "axios";

export const BASE_URL = "http://localhost:5000";

import { getItem } from "../utils/localStorageUtils.js";

const token = getItem("@auth_token");

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
