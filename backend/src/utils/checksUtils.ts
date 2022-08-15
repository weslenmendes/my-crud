import { getCrudByLabelAndUserId } from "../repositories/crudRepository.js";
import { getUserById } from "../repositories/userRepository.js";

import { PartialCrud } from "../interfaces/crudInterface.js";
import { generateError } from "../errors/errorGenerator.js";

export const checkIfExistsDataToEdit = (crud: PartialCrud) => {
  const isEditable =
    crud?.content &&
    typeof crud?.content === "object" &&
    Array.isArray(crud?.content);

  if (!isEditable)
    throw generateError({
      type: "NotFoundError",
      message: "There is no data to edit.",
    });

  return isEditable;
};

export const checkIfHaveId = (id: number) => {
  if (!id)
    throw generateError({
      type: "UnprocessableEntityError",
      message: "A id needed.",
    });

  if (id <= 0)
    throw generateError({
      type: "UnprocessableEntityError",
      message: "Invalid id.",
    });
};

export const checkIfHaveUserId = (userId: number) => {
  if (!userId)
    throw generateError({
      type: "UnprocessableEntityError",
      message: "A userId needed.",
    });
};

export const checkIfHaveLabel = (label: string) => {
  if (!label)
    throw generateError({
      type: "UnprocessableEntityError",
      message: "A label needed.",
    });
};

export const checkIfUserExists = async (userId: number) => {
  if (!userId)
    throw generateError({
      type: "UnprocessableEntityError",
      message: "User id required.",
    });

  const userExists = await getUserById(userId);

  if (!userExists)
    throw generateError({
      type: "NotFoundError",
      message: "User does not exist.",
    });

  return userExists;
};

export const checkIfCrudExists = async (label: string, userId: number) => {
  checkIfHaveLabel(label);
  checkIfHaveUserId(userId);

  const crudExists = await getCrudByLabelAndUserId(label, userId);

  if (!crudExists)
    throw generateError({
      type: "NotFoundError",
      message: "This crud does not exists.",
    });

  return crudExists;
};

export const checkIfCrudDoesNotExists = async (
  label: string,
  userId: number,
) => {
  checkIfHaveLabel(label);
  checkIfHaveUserId(userId);

  const crudExists = await getCrudByLabelAndUserId(label, userId);

  if (crudExists)
    throw generateError({
      type: "UnprocessableEntityError",
      message: "This crud already exists.",
    });

  return crudExists;
};
