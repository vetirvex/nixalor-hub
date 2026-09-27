type ErrorParams = Record<string, unknown>;

class ServiceError extends Error {
  public statusCode: number;
  public params: ErrorParams | null;
  public code: string;

  constructor(message: string, statusCode: number, code: string, params?: ErrorParams) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.params = params || null;
  }
}

export { ServiceError, type ErrorParams };
