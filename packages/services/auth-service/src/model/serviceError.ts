type ErrorParams = Record<string, unknown>;

class ServiceError extends Error {
  public statusCode: number;
  public params: ErrorParams | null;
  public type: string;

  constructor(message: string, statusCode: number, type: string, params?: ErrorParams) {
    super(message);
    this.statusCode = statusCode;
    this.type = type;
    this.params = params || null;
  }
}

export { ServiceError, type ErrorParams };
