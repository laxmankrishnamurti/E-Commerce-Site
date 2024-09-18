import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "sellers",
      required: [true, "Product must have a seller id"],
    },
    title: {
      type: String,
      required: [true, "Product title is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    discount: {
      type: Number,
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
    },
    productDescription: {
      type: Map,
      of: String,
      default: {},
    },
  },
  { timestamps: true }
);

const PRODUCT = mongoose.model("products", productSchema);

export default PRODUCT;
