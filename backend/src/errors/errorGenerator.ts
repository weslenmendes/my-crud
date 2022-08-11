import errorStatusCode from "./errorStatusCode.js";

export type typesOfError =
  | "BadRequestError"
  | "UnauthorizedError"
  | "NotFoundError"
  | "ForbiddenError"
  | "UnprocessableEntityError"
  | "InternalServerError";

type TError = {
  type: typesOfError;
  message?: string;
};

interface IErrorDetails {
  statusCode: errorStatusCode;
  message: string;
}

function isDetailError(err: any) {
  return err.statusCode && err.message;
}

export function errorDetailsGenerator(err: any): IErrorDetails {
  const errorDetails = {
    BadRequestError: {
      statusCode: errorStatusCode.BadRequest,
      message: err.message || "Bad Request",
    },
    UnauthorizedError: {
      statusCode: errorStatusCode.Unauthorized,
      message: err.message || "Unauthorized",
    },
    ForbiddenError: {
      statusCode: errorStatusCode.Forbidden,
      message: err.message || "Forbidden",
    },
    NotFoundError: {
      statusCode: errorStatusCode.NotFound,
      message: err.message || "Not Found",
    },
    UnprocessableEntityError: {
      statusCode: errorStatusCode.UnprocessableEntity,
      message: err.message || "Unprocessable Entity",
    },
    InternalServerError: {
      statusCode: errorStatusCode.InternalServerError,
      message: err.message || "An internal error has occurred",
    },
  };

  return isDetailError(err)
    ? err
    : errorDetails[err.type] || errorDetails.InternalServerError;
}

export function generateError(err: TError): IErrorDetails {
  return errorDetailsGenerator(err);
}
