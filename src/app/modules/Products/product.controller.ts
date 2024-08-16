import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { productServices } from "./product.services";

const createProduct = catchAsync(async(req, res) =>{
    const data = req.body;
  const result = await productServices.createProductInToDb(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully",
    data: result,
  });
})


const getAllProduct = catchAsync(async (req, res) => {
    const result = await productServices.getAllProductInToDb(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Products is retrieved succesfully",
      data: result,
    });
  });
  const getSingleProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await productServices.getSingleProductInToDb(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product is retrieved succesfully",
      data: result,
    });
  });
  const updateProduct = catchAsync(async (req, res) => {
    const data = req.body;
    const { id } = req.params;
    const result = await productServices.updateProductInToDb(id, data);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  });
  const deleteProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await productServices.deleteProductInToDb(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product deleted successfully",
      data: result,
    });
  });

  export const productsController = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
  }