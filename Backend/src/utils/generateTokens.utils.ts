import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config/config.ts";
import REFRESHTOKEN from "../models/refreshToken.model.ts";

interface IPayload {
  sellerId: string;
}

// Generate access token
export const generateAccessToken = (payload: IPayload) => {
  return jsonwebtoken.sign(payload, config.access_token_secret, {
    expiresIn: 15 * 60,
  });
};

// Generate refresh token
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

  const newToken = new REFRESHTOKEN({
    sellerId: sellerId,
    clientId: clientId,
    deviceId: deviceId,
    refreshTokenHash: hashRefreshToken,
    expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  await newToken.save();
};

// Generating both access and refresh token and storing into the database
const generateTokens = async (
  sellerId: string,
  clientId: string,
  deviceId: string
) => {
  const accessToken = generateAccessToken({ sellerId });
  const refreshToken = generateRefreshToken();

  await storeRefreshToken(sellerId, clientId, deviceId, refreshToken);

  return { accessToken, refreshToken };
};

export default generateTokens;
