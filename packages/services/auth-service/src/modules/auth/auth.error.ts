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

export { InvalidCredentialError, UserAlreadyExistsError };
