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
exports.OrdersServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const order_model_1 = require("./order.model");
const user_model_1 = require("../User/user.model");
const createOrdersInToDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ id: payload.userId });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "this user is not found");
    }
    payload.userId = user === null || user === void 0 ? void 0 : user._id;
    const result = yield order_model_1.Orders.create(payload);
    return result;
});
const getAllOrdersInToDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const OrdersQuery = new QueryBuilder_1.default(order_model_1.Orders.find(), query)
        .search(["orderDate", "status", "totalAmount", "paymentMethod"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield OrdersQuery.countTotal();
    const result = yield OrdersQuery.modelQuery;
    return {
        meta,
        result,
    };
});
const getSingleOrdersInToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Orders.findOne({ id });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "this Orders is not found");
    }
    if (result.isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "this Orders is deleted");
    }
    return result;
});
const updateOrdersInToDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const fineOrders = yield order_model_1.Orders.findOne({ id });
    if (!fineOrders) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "this Orders is not found");
    }
    const result = order_model_1.Orders.findOneAndUpdate({ id }, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteOrdersInToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const fineOrders = yield order_model_1.Orders.findOne({ id });
    if (!fineOrders) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "this Orders is not found");
    }
    const result = order_model_1.Orders.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, runValidators: true });
    return result;
});
exports.OrdersServices = {
    createOrdersInToDb,
    getAllOrdersInToDb,
    getSingleOrdersInToDb,
    updateOrdersInToDb,
    deleteOrdersInToDb,
};
