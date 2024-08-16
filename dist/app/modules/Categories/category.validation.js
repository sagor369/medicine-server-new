"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
const zod_1 = require("zod");
exports.categoryValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        slug: zod_1.z.string(),
        thumbnail: zod_1.z.string(),
        categoryType: zod_1.z.enum(['primary', 'secondary', 'tertiary']),
    }),
});
