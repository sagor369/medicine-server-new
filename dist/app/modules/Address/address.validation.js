"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressValidation = void 0;
const zod_1 = require("zod");
exports.AddressValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        phone: zod_1.z.string(),
        division: zod_1.z.string(),
        subDistrict: zod_1.z.string(),
        address: zod_1.z.string(),
        userId: zod_1.z.string(),
    }),
});
