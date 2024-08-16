import { z } from "zod";

export const AddressValidation = z.object({
  body: z.object({
    name: z.string(),
    phone: z.string(),
    division: z.string(),
    subDistrict: z.string(),
    address: z.string(),
    userId: z.string(),
  }),
});
