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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const address_model_1 = require("./address.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const user_model_1 = require("../User/user.model");
const createAddressInToDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = payload, moreData = __rest(payload, ["userId"]);
    const user = yield user_model_1.User.findOne({ id: userId });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "this user is not found");
    }
    const result = yield address_model_1.Address.create(Object.assign(Object.assign({}, moreData), { userId: user._id }));
    return result;
});
const getAllAddressInToDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(address_model_1.Address.find().populate("userId"), query)
        .search(["name", "price"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield productQuery.countTotal();
    const result = yield productQuery.modelQuery;
    return {
        meta,
        result,
    };
});
const getSingleAddressInToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield address_model_1.Address.findById(id).populate("userId");
    return result;
});
const updateAddressInToDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findProduct = address_model_1.Address.findById(id);
    if (!findProduct) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "this Address is not found");
    }
    const result = address_model_1.Address.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteAddressInToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findProduct = address_model_1.Address.findById(id);
    if (!findProduct) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "this product is not found");
    }
    const result = address_model_1.Address.findByIdAndUpdate(id, { isDelete: true }, { new: true, runValidators: true });
    return result;
});
exports.AddressServices = {
    createAddressInToDb,
    getAllAddressInToDb,
    getSingleAddressInToDb,
    updateAddressInToDb,
    deleteAddressInToDb,
};
