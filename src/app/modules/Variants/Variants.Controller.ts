import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { VariantsServices } from "./Variants.services";


const createVariants = catchAsync(async(req, res) =>{
    const data = req.body;
  const result = await VariantsServices.createVariaInToDb(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Variant created successfully",
    data: result,
  });
})


const getAllVariants = catchAsync(async (req, res) => {
    const result = await VariantsServices.getAllVariantsInToDb(req.query);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Variants is retrieved succesfully",
      data: result,
    });
  });
  const getSingleVariants = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await VariantsServices.getSingleVariantInToDb(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Variant is retrieved succesfully",
      data: result,
    });
  });
  const updateVariants = catchAsync(async (req, res) => {
    const data = req.body;
    const { id } = req.params;
    const result = await VariantsServices.updateVariantInToDb(id, data);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Variants updated successfully",
      data: result,
    });
  });
  const deleteVariants = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await VariantsServices.deleteVariantInToDb(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Variants deleted successfully",
      data: result,
    });
  });

  export const VariantsController = {
    createVariants,
    getAllVariants,
    getSingleVariants,
    updateVariants,
    deleteVariants
  }