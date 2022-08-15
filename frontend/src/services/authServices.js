import { api } from "./api";

export const SignIn = async (email, password) => {
  return api.post("/", { email, password });
};

export const SignUp = async ({
  name,
  email,
  image,
  password,
  confirmPassword,
}) => {
  return api.post("/sign-up", {
    name,
    email,
    image,
    password,
    confirmPassword,
  });
};

export const ValidateToken = async (token) => {
  return api.get("/validate", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
