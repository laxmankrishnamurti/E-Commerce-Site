export interface CustomErrorRequestHandler extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

class CustomErrorClass extends Error {
  statusCode: number;
  isOperational: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomErrorClass;
