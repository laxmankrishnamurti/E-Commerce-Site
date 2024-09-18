import mongoose, { Schema } from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    shippingAddress: [
      {
        fullName: { type: String },
        mobileNumber: { type: Number },
        alternateNumber: { type: Number },
        streetAddress: { type: String },
        landMark: { type: String },
        pinCode: { type: Number },
        city: { type: String },
        state: { type: String },
      },
    ],
    cartProducts: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "products",
        },
      },
    ],
    orders: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "products",
        },
      },
    ],
  },
  { timestamps: true }
);

const CUSTOMER = mongoose.model("customers", customerSchema);

export default CUSTOMER;
