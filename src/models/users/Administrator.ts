import BaseUserModel, { BaseUser } from "./BaseUser";
import mongoose from "mongoose";
import UserType from "../../types/enums/UserType";

export class Admin extends BaseUser {}

const AdminModel = BaseUserModel.discriminator<Admin & mongoose.Document>(
    UserType.ADMIN,
    new mongoose.Schema({})
);

export default AdminModel;