import { Types } from "mongoose"

export type TVariants = {
    name: string 
    price: number 
    productId: Types.ObjectId
}