"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const zod_1 = require("zod");
exports.productValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: "Name is required" }),
        brand: zod_1.z.string().min(1, { message: "Brand is required" }),
        slug: zod_1.z.string().min(1, { message: "Slug is required" }),
        photos: zod_1.z.array(zod_1.z.string().url(), {
            message: "Photos must be an array of valid URLs",
        }),
        description: zod_1.z.string().min(1, { message: "Description is required" }),
        metaKey: zod_1.z.string().min(1, { message: "Meta key is required" }),
        price: zod_1.z.number().positive({ message: "Price must be a positive number" }),
        discount: zod_1.z
            .number()
            .nonnegative({ message: "Discount must be a non-negative number" })
            .optional(),
        categories: zod_1.z.object({
            primaryCategoryId: zod_1.z.string().optional(),
            secondaryCategoryId: zod_1.z.string().optional(),
            tertiaryCategoryId: zod_1.z.string().optional(),
        })
            .optional(),
    }),
});
