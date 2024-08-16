"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantsValidation = void 0;
const zod_1 = require("zod");
exports.VariantsValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        price: zod_1.z.string(),
        productId: zod_1.z.string()
    })
});
