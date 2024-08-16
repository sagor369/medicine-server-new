import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AddressServices } from "./address.services";


const createAddress = catchAsync(async(req, res) =>{
    const data = req.body;
  const result = await AddressServices.createAddressInToDb(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Address created successfully",
    data: result,
  });
})


const getAllAddress = catchAsync(async (req, res) => {
    const result = await AddressServices.getAllAddressInToDb(req.query);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Address is retrieved succesfully",
      data: result,
    });
  });
  const getSingleAddress = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AddressServices.getSingleAddressInToDb(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Address is retrieved succesfully",
      data: result,
    });
  });
  const updateAddress = catchAsync(async (req, res) => {
    const data = req.body;
    const { id } = req.params;
    const result = await AddressServices.updateAddressInToDb(id, data);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Address updated successfully",
      data: result,
    });
  });
  const deleteAddress = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AddressServices.deleteAddressInToDb(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Address deleted successfully",
      data: result,
    });
  });

  export const AddressController = {
    createAddress,
    getAllAddress,
    getSingleAddress,
    updateAddress,
    deleteAddress
  }