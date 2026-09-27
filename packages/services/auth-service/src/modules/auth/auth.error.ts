import { ErrorParams, ServiceError } from "../../model/serviceError";

class InvalidCredentialError extends ServiceError {
  constructor(params?: ErrorParams) {
    super("Invalid credentials", 400, "InvalidCredentials", params);
  }
}

class UserAlreadyExistsError extends ServiceError {
  constructor(params?: ErrorParams) {
    super("Email is already taken", 409, "UserAlreadyExists", params);
  }
}

class TokenExpiredError extends ServiceError {
  constructor(params?: ErrorParams) {
    super("Token expired", 400, "TokenExpired", params);
  }
}

class InvalidTokenError extends ServiceError {
  constructor(params?: ErrorParams) {
    super("Invalid token", 400, "InvalidToken", params);
  }
}

export {
  InvalidCredentialError,
  UserAlreadyExistsError,
  TokenExpiredError,
  InvalidTokenError,
};
