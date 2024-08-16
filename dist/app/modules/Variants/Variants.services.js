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
exports.VariantsServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const Variants_model_1 = require("./Variants.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createVariaInToDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Variants_model_1.Variant.create(payload);
    return result;
});
const getAllVariantsInToDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(Variants_model_1.Variant.find({ isDeleted: false }).populate("productId"), query).search(['name', 'price'])
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
const getSingleVariantInToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Variants_model_1.Variant.find({ isDeleted: false }).populate("productId");
    return result;
});
const updateVariantInToDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findProduct = Variants_model_1.Variant.findById(id);
    if (!findProduct) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "this product is not found");
    }
    const result = Variants_model_1.Variant.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return result;
});
const deleteVariantInToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findProduct = Variants_model_1.Variant.findById(id);
    if (!findProduct) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "this product is not found");
    }
    const result = Variants_model_1.Variant.findByIdAndUpdate(id, { isDelete: true }, { new: true, runValidators: true });
    return result;
});
exports.VariantsServices = {
    createVariaInToDb,
    getAllVariantsInToDb,
    getSingleVariantInToDb,
    updateVariantInToDb,
    deleteVariantInToDb
};
