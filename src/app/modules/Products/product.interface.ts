import { Types } from "mongoose";

export type TProduct = {
  name: string;
  slug: string;
  photos: string[];
  description: string;
  metaKey: string;
  price: number;
  brand: string;
  isDeleted: boolean;
  discount?: number;
  stockStatus: boolean;
  status: "active" | "inactive";
  categories?: {
    CategoryId?: Types.ObjectId;
    secondaryCategoryId?: Types.ObjectId;
    tertiaryCategoryId?: Types.ObjectId;
  };
};
