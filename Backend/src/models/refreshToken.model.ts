import mongoose, { Document } from "mongoose";

export interface IRefreshToken extends Document {
  sellerId: mongoose.Schema.Types.ObjectId;
  clientId: string;
  deviceId: string;
  refreshTokenHash: string;
  expiredAt: Date;
}

const refreshTokenSchema = new mongoose.Schema<IRefreshToken>(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sellers",
      required: true,
    },
    clientId: {
      type: String,
      required: true,
    },
    deviceId: {
      type: String,
      required: true,
    },
    refreshTokenHash: {
      type: String,
      required: true,
    },
    expiredAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const REFRESHTOKEN = mongoose.model("refreshtokens", refreshTokenSchema);

export default REFRESHTOKEN;
