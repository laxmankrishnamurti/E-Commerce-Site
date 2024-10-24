import mongoose, { Schema, Document } from "mongoose";

interface IshippingAddress {
  fullName: string;
  mobileNumber: number;
  alternateNumber?: number;
  streetAddress?: string;
  landMark?: string;
  pinCode: number;
  city: string;
  state: string;
}

interface IcartProducts {
  productId: Schema.Types.ObjectId;
  quantity: number;
}

export interface ICustomers extends Document {
  fullName: string;
  email: string;
  phoneNumber: number;
  password: string;
  shippingAddress?: IshippingAddress[];
  cartProducts?: IcartProducts[];
  createdAt?: Date;
  updatedAt?: Date;
}

const customerSchema = new mongoose.Schema<ICustomers>(
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
      required: false,
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
      required: false,
    },
  },
  { timestamps: true }
);

// Add custom error message for unique index on email
// customerSchema.path('email').index({ unique: true, message: 'Email is already in use' });
// Let's handle it on application level ===> Using Global Error Handling Middleware

const CUSTOMER = mongoose.model<ICustomers>("customers", customerSchema);

export default CUSTOMER;
