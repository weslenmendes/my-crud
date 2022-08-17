import axios from "axios";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

import { getItem } from "../utils/localStorageUtils.js";

const token = getItem("@auth_token");

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
