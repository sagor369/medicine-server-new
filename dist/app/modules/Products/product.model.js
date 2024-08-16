"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    brand: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    metaKey: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    stockStatus: {
        type: Boolean,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    categories: {
        primaryCategoryId: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Category",
        },
        secondaryCategoryId: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Category",
        },
        tertiaryCategoryId: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Category",
        },
    },
}, {
    timestamps: true
});
exports.Product = (0, mongoose_1.model)("products", productSchema);
