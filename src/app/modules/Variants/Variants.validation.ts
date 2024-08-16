import { z } from "zod";

export const VariantsValidation =z.object({
    body: z.object({
        name: z.string(),
        price: z.string(),
        productId: z.string()
    })
})