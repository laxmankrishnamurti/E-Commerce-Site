import mongoose, { Schema } from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Fullname is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone number is required"],
    },
    password: {
      type: String,
      min: [6, "Password atleast have 6 characters"],
      max: [12, "Password is too long, max go upto 12 characters"],
      required: true,
    },
    shippingAddress: [
      {
        fullName: {
          type: String,
          required: true,
        },
        mobileNumber: {
          type: Number,
          required: true,
        },
        alternateNumber: {
          type: Number,
        },
        streetAddress: {
          type: String,
        },
        landMark: {
          type: String,
        },
        pinCode: {
          type: Number,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
      },
    ],
    cartProducts: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: [
            true,
            "Product id is required to add products into cart product",
          ],
        },
      },
    ],
    orderHistory: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: [
            true,
            "Product id is required to add products into order histroy",
          ],
        },
      },
    ],
  },
  { timestamps: true }
);

const CUSTOMER = mongoose.model("customers", customerSchema);

export default CUSTOMER;
