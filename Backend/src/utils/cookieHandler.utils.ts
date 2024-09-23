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
  console.log("input token  : ", token);
  const result = jsonwebtoken.verify(token, config.jsonwebtoken_secret);

  if (typeof result === "string") {
    throw new CustomErrorClass(400, "Invalid token");
  }

  return result as IPayload;
};

export { generateToken, verifyToken };
