"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const mongoose_1 = require("mongoose");
const order_const_1 = require("./order.const");
const OrderItemSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
const OrdersSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        enum: order_const_1.orderStatus,
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
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.Orders = (0, mongoose_1.model)("Order", OrdersSchema);
