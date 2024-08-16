import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateRandomNumberCode, generateUserId } from "./user.utils";
import { sendEmail } from "../../utils/sendEmail";

const createUserInToDb = async (payload: IUser) => {
  payload.role = "user";
  payload.id = await generateUserId();
  //   random code generete
  payload.varifyCode = await generateRandomNumberCode();

  const result = await User.create(payload);
  const verifyCode = ` ${result?.varifyCode}`;

  //   user mail send
  await sendEmail(payload?.email, verifyCode);
  return result;
};

const varifyUser = async (id: string) => {
  const findUser = await User.findById(id);
  if (!findUser) {
    throw new AppError(httpStatus.NOT_FOUND, "this user is not found");
  }
  if (findUser?.isDeleted) {
    throw new AppError(httpStatus.UNAUTHORIZED, "this user is deleted");
  }
  if (findUser?.status === "blocked") {
    throw new AppError(httpStatus.NOT_FOUND, "this user is block");
  }
  const varifyCode = await generateRandomNumberCode();

  const result = await User.findByIdAndUpdate(
    id,
    { varifyCode },
    { new: true, runValidators: true }
  );

  await sendEmail(findUser?.email, `${varifyCode}`);
  return result;
};

const getAllUserInToDb = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(User.find(), query)
    .search(["name", "email", "id"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await studentQuery.countTotal();
  const result = await studentQuery.modelQuery;

  return {
    meta,
    result,
  };
};
const getSingleUserInToDb = async (id: string) => {
  const result = await User.findOne({ id });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "this user is not found");
  }
  if (result.isDeleted) {
    throw new AppError(httpStatus.UNAUTHORIZED, "this user is deleted");
  }
  if (result.status === "blocked") {
    throw new AppError(httpStatus.NOT_FOUND, "this user is block");
  }

  return result;
};
const updateUserInToDb = async (id: string, payload: Partial<IUser>) => {
  const findUser = await User.findOne({ id });
  if (!findUser) {
    throw new AppError(httpStatus.NOT_FOUND, "this user is not found");
  }
  if (findUser.isDeleted) {
    throw new AppError(httpStatus.UNAUTHORIZED, "this user is deleted");
  }
  const result = User.findOneAndUpdate({ id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteUserInToDb = async (id: string) => {
  const findUser = await User.findOne({ id });
  if (!findUser) {
    throw new AppError(httpStatus.NOT_FOUND, "this user is not found");
  }
  if (findUser.isDeleted) {
    throw new AppError(httpStatus.UNAUTHORIZED, "this user alredy deleted");
  }
  const result = User.findOneAndUpdate(
    { id },
    { isDeleted: true },
    { new: true, runValidators: true }
  );
  return result;
};

export const UserServices = {
  createUserInToDb,
  getAllUserInToDb,
  getSingleUserInToDb,
  updateUserInToDb,
  deleteUserInToDb,
  varifyUser
};
