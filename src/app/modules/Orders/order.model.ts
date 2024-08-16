import { Schema, model, Types } from "mongoose";
import { orderStatus } from "./order.const";
import { OrderItem, TOrders } from "./order.interface";

const OrderItemSchema = new Schema<OrderItem>({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const OrdersSchema = new Schema<TOrders>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderDate: {
    type: Date,
    required: true,
  },
  orderId: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: orderStatus,
    default: "Processing"
  },
  items: {
    type: [OrderItemSchema],
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Address",
  },
  paymentMethod: {
    type: String,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Orders = model("Order", OrdersSchema);
