import Joi from "joi";

import { regex } from "../utils/constantsUtils.js";

const messages = {
  name: "Um nome é necessário.",
  namePattern:
    "O nome deve conter apenas letras e espaços, com no mínimo 3 caracteres, e não pode conter números.",
  image: "Uma imagem é necessária.",
  imagePattern: "O link da imagem deve ser válido.",
  email: "Um e-mail é necessário.",
  emailPattern: "O e-mail deve ser válido.",
  password: "Uma senha é necessária.",
  passwordPattern:
    "A senha deve ter pelo menos 8 a 30 caracteres e pode conter apenas letras minúsculas, maiúsculas e números.",
  passwordConfirmation: "A confirmação da senha deve ser igual à senha.",
  passwordConfirmationPattern:
    "A confirmação da senha deve ser válida, a confirmação deve ter pelo menos 8 a 30 caracteres e pode conter apenas letras minúsculas, maiúsculas e números.",
};

export const SignUpSchema = Joi.object().keys({
  name: Joi.string().pattern(regex.NAME).required().messages({
    "string.notEmpty": messages.name,
    "string.pattern.base": messages.namePattern,
  }),
  image: Joi.string().uri().allow("").messages({
    "string.uri": messages.imagePattern,
  }),
  email: Joi.string().pattern(regex.EMAIL).required().messages({
    "string.notEmpty": messages.email,
    "string.email": messages.emailPattern,
    "string.pattern.base": messages.emailPattern,
  }),
  password: Joi.string().pattern(regex.PASSWORD).required().messages({
    "string.notEmpty": messages.password,
    "string.pattern.base": messages.passwordPattern,
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": messages.passwordConfirmation,
    "any.required": messages.passwordConfirmationPattern,
  }),
});

export const SignInSchema = Joi.object().keys({
  email: Joi.string().pattern(regex.EMAIL).required().messages({
    "string.notEmpty": messages.email,
    "string.email": messages.emailPattern,
    "string.pattern.base": messages.emailPattern,
  }),
  password: Joi.string().pattern(regex.PASSWORD).required().messages({
    "string.notEmpty": messages.password,
    "string.pattern.base": messages.passwordPattern,
  }),
});
