import { api } from "./api.js";

export const getCruds = () => {
  const url = "cruds/visualize/all";
  return api.get(url);
};

export const getCrud = (label) => {
  const url = `cruds/${label}`;
  return api.get(url);
};

export const createCrud = (label) => {
  const url = "cruds/create";
  return api.post(url, { label });
};

export const deleteCrud = (label) => {
  const url = `cruds/${label}`;
  return api.delete(url);
};
