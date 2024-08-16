"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const sendEmail_1 = require("../../utils/sendEmail");
const createUserInToDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.role = "user";
    payload.id = yield (0, user_utils_1.generateUserId)();
    //   random code generete
    payload.varifyCode = yield (0, user_utils_1.generateRandomNumberCode)();
    const result = yield user_model_1.User.create(payload);
    const verifyCode = ` ${result === null || result === void 0 ? void 0 : result.varifyCode}`;
    //   user mail send
    yield (0, sendEmail_1.sendEmail)(payload === null || payload === void 0 ? void 0 : payload.email, verifyCode);
    return result;
});
const varifyUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield user_model_1.User.findById(id);
    if (!findUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "this user is not found");
    }
    if (findUser === null || findUser === void 0 ? void 0 : findUser.isDeleted) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "this user is deleted");
    }
    if ((findUser === null || findUser === void 0 ? void 0 : findUser.status) === "blocked") {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "this user is block");
    }
    const varifyCode = yield (0, user_utils_1.generateRandomNumberCode)();
    const result = yield user_model_1.User.findByIdAndUpdate(id, { varifyCode }, { new: true, runValidators: true });
    yield (0, sendEmail_1.sendEmail)(findUser === null || findUser === void 0 ? void 0 : findUser.email, `${varifyCode}`);
    return result;
});
const getAllUserInToDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const studentQuery = new QueryBuilder_1.default(user_model_1.User.find(), query)
        .search(["name", "email", "id"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield studentQuery.countTotal();
    const result = yield studentQuery.modelQuery;
    return {
        meta,
        result,
    };
});
const getSingleUserInToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ id });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "this user is not found");
    }
    if (result.isDeleted) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "this user is deleted");
    }
    if (result.status === "blocked") {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "this user is block");
    }
    return result;
});
const updateUserInToDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield user_model_1.User.findOne({ id });
    if (!findUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "this user is not found");
    }
    if (findUser.isDeleted) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "this user is deleted");
    }
    const result = user_model_1.User.findOneAndUpdate({ id }, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteUserInToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield user_model_1.User.findOne({ id });
    if (!findUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "this user is not found");
    }
    if (findUser.isDeleted) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "this user alredy deleted");
    }
    const result = user_model_1.User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, runValidators: true });
    return result;
});
exports.UserServices = {
    createUserInToDb,
    getAllUserInToDb,
    getSingleUserInToDb,
    updateUserInToDb,
    deleteUserInToDb,
    varifyUser
};
