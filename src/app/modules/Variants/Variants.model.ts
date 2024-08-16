import { model, Schema } from "mongoose";
import { TVariants } from "./Variants.interface";

const VariantsSchema = new Schema<TVariants>({
    name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
})

export const Variant = model<TVariants>('variants', VariantsSchema)