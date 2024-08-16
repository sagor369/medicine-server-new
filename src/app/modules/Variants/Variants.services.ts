import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Variant } from "./Variants.model";
import { TVariants } from "./Variants.interface";
import QueryBuilder from "../../builder/QueryBuilder";

const createVariaInToDb = async (payload: TVariants) => {
  const result = await Variant.create(payload);
  return result;
};
const getAllVariantsInToDb = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    Variant.find({isDeleted: false}).populate(
      "productId"
    ),
    query
  ).search(['name','price'])
  .filter()
  .sort()
  .paginate()
  .fields();
  const meta = await productQuery.countTotal();
  const result = await productQuery.modelQuery;

  return {
    meta,
    result,
  };
};
const getSingleVariantInToDb = async (id: string) => {
  const result = await  Variant.find({isDeleted: false}).populate(
    "productId")
  return result;
};

const updateVariantInToDb = async(id: string, payload: Partial<TVariants>) =>{
    const findProduct = Variant.findById(id)
    if(!findProduct){
        throw new AppError(httpStatus.NOT_FOUND, "this product is not found")
    }
    const result = Variant.findByIdAndUpdate(id, payload, {new: true, runValidators:true})
    return result 
}
const deleteVariantInToDb = async(id: string) =>{
    const findProduct = Variant.findById(id)
    if(!findProduct){
        throw new AppError(httpStatus.NOT_FOUND, "this product is not found")
    }
    const result = Variant.findByIdAndUpdate(id, {isDelete: true}, {new: true, runValidators:true})
    return result 
}

export const VariantsServices = {
    createVariaInToDb,
    getAllVariantsInToDb,
    getSingleVariantInToDb,
    updateVariantInToDb,
    deleteVariantInToDb
}