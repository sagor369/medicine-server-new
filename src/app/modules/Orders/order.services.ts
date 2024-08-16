import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TOrders } from "./order.interface";
import { Orders } from "./order.model";
import { User } from "../User/user.model";

const createOrdersInToDb = async (payload: TOrders) => {
  const user = await User.findOne({ id: payload.userId });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "this user is not found");
  }
  payload.userId = user?._id;
  const result = await Orders.create(payload);
  return result;
};
const getAllOrdersInToDb = async (query: Record<string, unknown>) => {
  const OrdersQuery = new QueryBuilder(Orders.find(), query)
    .search(["orderDate", "status", "totalAmount", "paymentMethod"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await OrdersQuery.countTotal();
  const result = await OrdersQuery.modelQuery;

  return {
    meta,
    result,
  };
};
const getSingleOrdersInToDb = async (id: string) => {
  const result = await Orders.findOne({ id });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "this Orders is not found");
  }
  if (result.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "this Orders is deleted");
  }
  return result;
};
const updateOrdersInToDb = async (id: string, payload: Partial<TOrders>) => {
  const fineOrders = await Orders.findOne({ id });
  if (!fineOrders) {
    throw new AppError(httpStatus.NOT_FOUND, "this Orders is not found");
  }
  const result = Orders.findOneAndUpdate({ id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteOrdersInToDb = async (id: string) => {
  const fineOrders = await Orders.findOne({ id });
  if (!fineOrders) {
    throw new AppError(httpStatus.NOT_FOUND, "this Orders is not found");
  }
  const result = Orders.findOneAndUpdate(
    { id },
    { isDeleted: true },
    { new: true, runValidators: true }
  );
  return result;
};

export const OrdersServices = {
  createOrdersInToDb,
  getAllOrdersInToDb,
  getSingleOrdersInToDb,
  updateOrdersInToDb,
  deleteOrdersInToDb,
};
