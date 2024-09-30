import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config/config";
import REFRESHTOKEN from "../models/refreshToken.model";

interface IPayload {
  sellerId: string;
}

// Generating access token
const generateAccessToken = (payload: IPayload) => {
  return jsonwebtoken.sign(payload, config.access_token_secret, {
    expiresIn: 15 * 60 * 1000,
  });
};

// Generating refresh token
const generateRefreshToken = () => {
  return jsonwebtoken.sign({}, config.refresh_token_secret, {
    expiresIn: "7d",
  });
};

// Storing refresh token in database with client info
const storeRefreshToken = async (
  sellerId: string,
  clientId: string,
  deviceId: string,
  refreshToken: string
) => {
  const hashRefreshToken = await bcrypt.hash(refreshToken, 10);
};
