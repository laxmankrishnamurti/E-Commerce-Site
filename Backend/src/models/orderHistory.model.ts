import mongoose, { Schema, Document } from "mongoose";

export interface IOrderHistory extends Document {
  customerId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderHistorySchema = new mongoose.Schema<IOrderHistory>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "customers",
      required: [true, "Customer Id is required for order history"],
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: [true, "Product Id is required for order history"],
    },
  },
  { timestamps: true }
);

const ORDERHISTORY = mongoose.model<IOrderHistory>(
  "orderhistories",
  orderHistorySchema
);

export default ORDERHISTORY;
