import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const createCategoryInToDb = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};
const getAllCategoryInToDb = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(Category.find(), query)
    .search(["name", "slug", "thumbnail"])
    .filter()
    .sort()
    .paginate()
    .fields();
    const meta = await categoryQuery.countTotal();
    const result = await categoryQuery.modelQuery;
  
    return {
      meta,
      result,
    };
};
const getSingleCategoryInToDb = async (id: string) => {
    const result = await Category.findOne({id})
    if(!result){
        throw new AppError(httpStatus.NOT_FOUND, "this Category is not found")
    }
    if(result.isDeleted){
        throw new AppError(httpStatus.FORBIDDEN, "this Category is deleted")
    }
  return result;
};
const updateCategoryInToDb = async (
  id: string,
  payload: Partial<TCategory>
) => {
    const fineCategory = await Category.findOne({id})
    if(!fineCategory){
        throw new AppError(httpStatus.NOT_FOUND, "this Category is not found")
    }
    const result = Category.findOneAndUpdate({id}, payload, {new: true, runValidators: true})
  return result;
};
const deleteCategoryInToDb = async (id: string) => {
    const fineCategory = await Category.findOne({id})
    if(!fineCategory){
        throw new AppError(httpStatus.NOT_FOUND, "this Category is not found")
    }
    const result = Category.findOneAndUpdate({id}, {isDeleted: true}, {new: true, runValidators: true})
    return result;
};

export const CategoryServices = {
  createCategoryInToDb,
  getAllCategoryInToDb,
  getSingleCategoryInToDb,
  updateCategoryInToDb,
  deleteCategoryInToDb,
};
