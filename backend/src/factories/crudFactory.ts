import { PartialCrud } from "../interfaces/crudInterface.js";

export const generateCrud = (
  label: string,
  userId: number,
  content: any,
  lastKey: number,
) => {
  return {
    label,
    userId,
    content,
    lastKey,
  };
};
