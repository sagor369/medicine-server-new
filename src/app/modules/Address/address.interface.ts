import { Types } from "mongoose";

export type TAddress = {
  userId: Types.ObjectId;
  name: string;
  phone: string;
  division: string;
  district: string;
  subDistrict: string;
  address: string;
};
