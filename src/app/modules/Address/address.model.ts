import { model, Schema } from "mongoose";
import { TAddress } from "./address.interface";

const AssressSchema = new Schema<TAddress>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users', 
  },
  name: {
    type: String,
    required: true,
    trim: true, 
  },
  phone: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: true,
    trim: true,
  },
  district: {
    type: String,
    required: true,
    trim: true,
  },
  subDistrict: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  }
})

export const Address = model<TAddress>('address', AssressSchema)