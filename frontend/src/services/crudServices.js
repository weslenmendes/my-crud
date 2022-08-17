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

export const createColumn = (label, columnName) => {
  const url = "cruds/create/column";
  return api.post(url, { label, columnName });
};

export const deleteColumn = (label, columnName) => {
  const url = `cruds/column/${label}?columnName=${columnName}`;
  return api.delete(url);
};

export const createRow = (label) => {
  const url = "cruds/create/row";
  return api.post(url, { label });
};

export const deleteRow = (label, rowId) => {
  const url = `cruds/remove/row/${rowId}?label=${label}`;
  return api.delete(url);
};
