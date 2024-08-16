import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CategoryServices } from "./category.services";

const createCategory = catchAsync(async (req, res) => {
    const result = await CategoryServices.createCategoryInToDb(req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category is craeted succesfully",
      data: result,
    });
  });
const getAllCategory = catchAsync(async (req, res) => {
    const result = await CategoryServices.getAllCategoryInToDb(req.query);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category is retrieved succesfully",
      data: result,
    });
  });
const getSingleCategory = catchAsync(async (req, res) => {
    const {categoryId} = req.params
    const result = await CategoryServices.getSingleCategoryInToDb(categoryId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category is retrieved succesfully",
      data: result,
    });
  });
const updateCategory = catchAsync(async (req, res) => {
    const {categoryId} = req.params
    const result = await CategoryServices.updateCategoryInToDb(categoryId, req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category is update succesfully",
      data: result,
    });
  });
const deleteCategory = catchAsync(async (req, res) => {
    const {categoryId} = req.params
    const result = await CategoryServices.deleteCategoryInToDb(categoryId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category is delete succesfully",
      data: result,
    });
  });

  export const CategoryController = {
    createCategory,
    getAllCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory
  }