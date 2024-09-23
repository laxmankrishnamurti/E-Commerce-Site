import jsonwebtoken from "jsonwebtoken";
import config from "../config/config.ts";
import CustomErrorClass from "./customErrorClass.utils.ts";

interface IPayload {
  userId: string;
}

const generateToken = (payload: IPayload): string => {
  try {
    const generatedTokenn: string = jsonwebtoken.sign(
      payload,
      config.jsonwebtoken_secret,
      { expiresIn: "1d" }
    );
    return generatedTokenn;
  } catch (error) {
    throw new CustomErrorClass(500, "Internal server error");
  }
};

const verifyToken = (token: string): IPayload => {
  try {
    const result = jsonwebtoken.verify(token, config.jsonwebtoken_secret);

    if (typeof result === "string") {
      throw new CustomErrorClass(400, "Invalid token format");
    }

    return result as IPayload;
  } catch (error) {
    if (error instanceof jsonwebtoken.JsonWebTokenError) {
      throw new CustomErrorClass(401, "Invalid or expired token");
    } else {
      // Rethrow any other errors (possibly internal server errors)
      throw error;
    }
  }
};

export { generateToken, verifyToken };
