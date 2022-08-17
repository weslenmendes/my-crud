import bcrypt from "bcrypt";

const encrypt = (data: string): string | null => {
  if (!data) return null;

  const SALT = +process.env.BCRYPT_SALT;
  const dataEncrypted = bcrypt.hashSync(data, SALT);

  return dataEncrypted;
};

const compare = (dataEncrypted: string, data: string): boolean => {
  if (!dataEncrypted || !data) return false;

  const areTheSame = bcrypt.compareSync(data, dataEncrypted);

  return areTheSame;
};

export { encrypt, compare };
