import statusCode from "../utils/statusCodeUtils.js";

enum errorStatusCode {
  BadRequest = statusCode.BAD_REQUEST,
  Unauthorized = statusCode.UNAUTHORIZED,
  Forbidden = statusCode.FORBIDDEN,
  NotFound = statusCode.NOT_FOUND,
  UnprocessableEntity = statusCode.UNPROCESSABLE_ENTITY,
  InternalServerError = statusCode.INTERNAL_SERVER_ERROR,
}

export default errorStatusCode;
