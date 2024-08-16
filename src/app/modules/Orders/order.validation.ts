import { Types } from "mongoose";
import { z } from "zod";
import { orderStatus } from "./order.const";




const OrderItemSchema = z.object({
    productId: z.string(),
    name: z.string().min(1, "Product name is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    price: z.number().min(0, "Price must be a positive number"),
  });

export const OrdersValidation = z.object({
    body: z.object({
        userId: z.string(),
        orderId: z.number(),
        orderDate: z.string(),
        items: OrderItemSchema.array(),
        totalAmount: z.number().min(0, "Total amount must be a positive number"),
        shippingAddress: z.string(),
        paymentMethod: z.string().optional(),
    })
})