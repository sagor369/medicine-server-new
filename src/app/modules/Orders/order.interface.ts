import { Types } from "mongoose";
import { orderStatus } from "./order.const";

export type OrderItem = {
  productId: Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
};

export type TOrders = {
  userId: Types.ObjectId;
  orderId: number;
  orderDate: Date;
  status: keyof typeof orderStatus;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: Types.ObjectId;
  paymentMethod?: string;
  isPaid: boolean;
  isDeleted: boolean;
};
