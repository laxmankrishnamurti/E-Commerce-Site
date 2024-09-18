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
      unique: [true, "Email is already in use"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone number is required"],
    },
    password: {
      type: String,
      minlength: [6, "Password atleast have 6 characters"],
      maxlength: [12, "Password is too long, max go upto 12 characters"],
      required: [true, "Password is required"],
    },
    shippingAddress: {
      type: [
        {
          fullName: {
            type: String,
            required: [true, "Fullname is required for shipping"],
          },
          mobileNumber: {
            type: Number,
            required: [true, "Mobile number is required for shipping"],
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
            required: [true, "PIN Code must required for shipping"],
          },
          city: {
            type: String,
            required: [true, "City is required for shipping"],
          },
          state: {
            type: String,
            required: [true, "State is required for shipping"],
          },
        },
      ],
    },
    cartProducts: {
      type: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "products",
            required: [
              true,
              "Product id is required to add products into cart product",
            ],
          },
          quantity: {
            type: Number,
            required: [
              true,
              "Product Quantity is required to add products into cart product",
            ],
          },
        },
      ],
    },
    orderHistory: {
      type: [
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
  },
  { timestamps: true }
);

const CUSTOMER = mongoose.model("customers", customerSchema);

export default CUSTOMER;
