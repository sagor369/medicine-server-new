import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: {
      accessToken,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await AuthServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated succesfully!',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});

const resetVarifyCode = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await AuthServices.resetVarifyCode(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "reset varify code successfully",
    data: result,
  });567114
});
const varifyEmail = catchAsync(async (req, res) => {
  const {id} = req.params;
  const code = Number(req?.body?.id)
  console.log({id, code, req: req.body})
  const result = await AuthServices.varifyEmail(id,code );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "your email varify  successfully",
    data: result,
  });
});

 

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
  resetVarifyCode,
  varifyEmail
};
