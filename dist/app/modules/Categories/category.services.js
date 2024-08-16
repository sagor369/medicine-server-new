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
exports.CategoryServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const category_model_1 = require("./category.model");
const createCategoryInToDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.create(payload);
    return result;
});
const getAllCategoryInToDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryQuery = new QueryBuilder_1.default(category_model_1.Category.find(), query)
        .search(["name", "slug", "thumbnail"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield categoryQuery.countTotal();
    const result = yield categoryQuery.modelQuery;
    return {
        meta,
        result,
    };
});
const getSingleCategoryInToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findOne({ id });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "this Category is not found");
    }
    if (result.isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "this Category is deleted");
    }
    return result;
});
const updateCategoryInToDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const fineCategory = yield category_model_1.Category.findOne({ id });
    if (!fineCategory) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "this Category is not found");
    }
    const result = category_model_1.Category.findOneAndUpdate({ id }, payload, { new: true, runValidators: true });
    return result;
});
const deleteCategoryInToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const fineCategory = yield category_model_1.Category.findOne({ id });
    if (!fineCategory) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "this Category is not found");
    }
    const result = category_model_1.Category.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, runValidators: true });
    return result;
});
exports.CategoryServices = {
    createCategoryInToDb,
    getAllCategoryInToDb,
    getSingleCategoryInToDb,
    updateCategoryInToDb,
    deleteCategoryInToDb,
};
