"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersValidation = void 0;
const zod_1 = require("zod");
const OrderItemSchema = zod_1.z.object({
    productId: zod_1.z.string(),
    name: zod_1.z.string().min(1, "Product name is required"),
    quantity: zod_1.z.number().min(1, "Quantity must be at least 1"),
    price: zod_1.z.number().min(0, "Price must be a positive number"),
});
exports.OrdersValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string(),
        orderId: zod_1.z.number(),
        orderDate: zod_1.z.string(),
        items: OrderItemSchema.array(),
        totalAmount: zod_1.z.number().min(0, "Total amount must be a positive number"),
        shippingAddress: zod_1.z.string(),
        paymentMethod: zod_1.z.string().optional(),
    })
});
