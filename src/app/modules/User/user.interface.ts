import { Model } from "mongoose";
import { USER_ROLE, UserStatus } from "./user.const";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  varifyCode: number;
  passwordChangedAt?: Date;
  role: keyof typeof USER_ROLE;
  status: "in-progress" | "blocked" | "panding";
  isDeleted: boolean;
}

export interface UserModel extends Model<IUser> {
  //instance methods for checking if the user exist
  isUserExistsByCustomId(id: string): Promise<IUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
