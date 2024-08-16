import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Address } from "./address.model";
import { TAddress } from "./address.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { User } from "../User/user.model";

const createAddressInToDb = async (payload: TAddress) => {
  const { userId, ...moreData } = payload;
  const user = await User.findOne({ id: userId });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "this user is not found");
  }
  const result = await Address.create({ ...moreData, userId: user._id });
  return result;
};
const getAllAddressInToDb = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    Address.find().populate("userId"),
    query
  )
    .search(["name", "price"])
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
const getSingleAddressInToDb = async (id: string) => {
  const result = await Address.findById(id).populate("userId");
  return result;
};

const updateAddressInToDb = async (id: string, payload: Partial<TAddress>) => {
  const findProduct = Address.findById(id);
  if (!findProduct) {
    throw new AppError(httpStatus.NOT_FOUND, "this Address is not found");
  }
  const result = Address.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteAddressInToDb = async (id: string) => {
  const findProduct = Address.findById(id);
  if (!findProduct) {
    throw new AppError(httpStatus.NOT_FOUND, "this product is not found");
  }
  const result = Address.findByIdAndUpdate(
    id,
    { isDelete: true },
    { new: true, runValidators: true }
  );
  return result;
};

export const AddressServices = {
  createAddressInToDb,
  getAllAddressInToDb,
  getSingleAddressInToDb,
  updateAddressInToDb,
  deleteAddressInToDb,
};
