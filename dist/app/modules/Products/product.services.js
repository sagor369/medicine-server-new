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
exports.productServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = require("./product.model");
const createProductInToDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(payload);
    return result;
});
const getAllProductInToDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(product_model_1.Product.find(), query).search(['name', 'description', 'price', 'slug'])
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
const getSingleProductInToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id);
    return result;
});
const updateProductInToDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findProduct = product_model_1.Product.findById(id);
    if (!findProduct) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "this product is not found");
    }
    const result = product_model_1.Product.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return result;
});
const deleteProductInToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findProduct = product_model_1.Product.findById(id);
    if (!findProduct) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "this product is not found");
    }
    const result = product_model_1.Product.findByIdAndUpdate(id, { isDelete: true }, { new: true, runValidators: true });
    return result;
});
exports.productServices = {
    createProductInToDb,
    getAllProductInToDb,
    getSingleProductInToDb,
    updateProductInToDb,
    deleteProductInToDb
};
