import mongoose, { Schema, Document } from "mongoose";

interface Iproducts {
  productId: Schema.Types.ObjectId;
  quantity: number;
}

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

export interface IOrders extends Document {
  orderId: string;
  customerId: Schema.Types.ObjectId;
  sellerId: Schema.Types.ObjectId;
  orderDate: Date;
  status: "CONFIRM" | "SHIPPED" | "DISPATCHED" | "DELIVERED";
  paymentMethod: "CASH" | "CARD";
  products: Iproducts[];
  shippingAddress: IshippingAddress;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new mongoose.Schema<IOrders>({
  orderId: {
    type: String,
    required: [true, "Order id is required"],
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "customers",
    required: [true, "Customer Id is required"],
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "sellers",
    required: [true, "Seller Id is required"],
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["CONFIRM", "SHIPPED", "DISPATCHED", "DELIVERED"],
    default: "CONFIRM",
  },
  paymentMethod: {
    type: String,
    enum: ["CASH", "CARD"],
    default: "CASH",
  },
  products: {
    type: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: [true, "Product Id is required"],
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
        },
      },
    ],
    required: [true, "Products array is required"],
  },
  shippingAddress: {
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
}, {timestamps: true});

const ORDER = mongoose.model<IOrders>("orders", orderSchema);

export default ORDER;
