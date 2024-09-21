// For custom error type declaration
export interface CustomErrorRequestHandler extends Error {
  statusCode: number;
  isOperational: boolean;
  code: number;
}

// For sending custom error
class CustomErrorClass extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomErrorClass;
