import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductInToDb = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};
const getAllProductInToDb = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    Product.find(),
    query
  ).search(['name', 'description','price', 'slug'])
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
const getSingleProductInToDb = async (id: string) => {
  const result = await Product.findById(id)

  return result;
};

const updateProductInToDb = async(id: string, payload: Partial<TProduct>) =>{
    const findProduct = Product.findById(id)
    if(!findProduct){
        throw new AppError(httpStatus.NOT_FOUND, "this product is not found")
    }
    const result = Product.findByIdAndUpdate(id, payload, {new: true, runValidators:true})
    return result 
}
const deleteProductInToDb = async(id: string) =>{
    const findProduct = Product.findById(id)
    if(!findProduct){
        throw new AppError(httpStatus.NOT_FOUND, "this product is not found")
    }
    const result = Product.findByIdAndUpdate(id, {isDelete: true}, {new: true, runValidators:true})
    return result 
}

export const productServices = {
    createProductInToDb,
    getAllProductInToDb,
    getSingleProductInToDb,
    updateProductInToDb,
    deleteProductInToDb
}
