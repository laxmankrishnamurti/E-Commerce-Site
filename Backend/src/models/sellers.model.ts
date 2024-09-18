import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
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
    password: {
      type: String,
      minlength: [6, "Password must have at least 6 characters"],
      maxlength: [12, "Password is too large, less than 12 characters"],
      required: [true, "Password is rquired"],
    },
    phoneNumber: {
      type: Number,
      min: [10, "Please enter a valid phone number"],
      max: [11, "Please enter a valid phone number"],
      required: [true, "Phone number is required"],
    },
    storeName: {
      type: String,
      required: [true, "Store name is required"],
    },
    panDetails: {
      panNumber: {
        type: String,
        required: [true, "Pan card number is required"],
      },
      panHolder: {
        type: String,
        required: [true, "Pan card holder name is required"],
      },
      panPhoto: {
        type: String,
        required: [true, "Pan card photo is required"],
      },
      required: [true, "PAN details are required"],
    },
    accountDetails: {
      accountHolder: {
        type: String,
        required: [true, "Account holder name is required"],
      },
      accountNumber: {
        type: Number,
        required: [true, "Account number is required"],
      },
      ifscCode: {
        type: String,
        required: [true, "IFSC code is required"],
      },
      required: [true, "Account details are required"],
    },
    pickupAddress: {
      type: [
        {
          pickupStreet: {
            type: String,
            required: [true, "Pickup street is required"],
          },
          city: {
            type: String,
            required: [true, "City is required"],
          },
          pinCode: {
            type: Number,
            required: [true, "PIN Code is required"],
          },
          state: {
            type: String,
            required: [true, "State is required"],
          },
          shippingMethod: {
            type: String,
            enum: ["SHOPI", "SELF"],
            default: "SHOPI",
          },
          shippingFeePrefrences: {
            type: String,
            enum: ["CUSTOMER", "SELF"],
            default: "SELF",
          },
        },
      ],
      required: [true, "Pickup address is required"], // Ensure the array itself is required
    },
  },
  { timestamps: true }
);

const SELLER = mongoose.model("sellers", sellerSchema);

export default SELLER;
