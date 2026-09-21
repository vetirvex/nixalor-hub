import { ErrorParams, ServiceError } from "../../model/serviceError";

class InvalidCredentialError extends ServiceError {
  constructor(params?: ErrorParams) {
    super("Invalid credentials", 400, "InvalidCredentials", params);
  }
}

export { InvalidCredentialError };
