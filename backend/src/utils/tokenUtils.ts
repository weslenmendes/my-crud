import jwt from "jsonwebtoken";

interface IPayload {
  userId: number;
}

interface IToken {
  success: boolean;
  result: string;
}

interface IValidate {
  valid: boolean;
  message: string;
}

const createToken = (data: IPayload): IToken => {
  const SECRET = process.env.JWT_SECRET;
  const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

  if (!data) return { success: false, result: "" };

  const payload = { ...data };
  const options = { expiresIn: EXPIRES_IN };

  const token = jwt.sign(payload, SECRET, options);

  return { success: true, result: token };
};

const isValidToken = (token: string): IValidate => {
  if (!token) return { valid: false, message: "Empty token is not allowed." };

  const tokenPointCount = (token.match(/\./g) || []).length;
  const totalOfDotsInValidToken = 2;

  if (tokenPointCount !== totalOfDotsInValidToken)
    return { valid: false, message: "Invalid token format." };

  const SECRET = process.env.JWT_SECRET;

  try {
    jwt.verify(token, SECRET);
    return { valid: true, message: "" };
  } catch (e) {
    if (e?.name === "TokenExpiredError")
      return { valid: false, message: "Token expired." };

    if (e?.name === "JsonWebTokenError")
      return { valid: false, message: e.message };

    if (e?.name === "NotBeforeError")
      return { valid: false, message: "Inactive token." };

    return { valid: false, message: "Invalid token." };
  }
};

const decodeToken = (token: string): IPayload => {
  const payload = jwt.decode(token) as IPayload;
  return payload;
};

export { createToken, isValidToken, decodeToken };
