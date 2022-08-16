import axios from "axios";

import { getItem } from "../utils/localStorageUtils.js";

const token = getItem("@auth_token");

export const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
