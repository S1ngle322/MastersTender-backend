import { BaseUser } from "./BaseUser";
import mongoose from "mongoose";
import UserType from "../../types/enums/UserType";
export class SuperAdmin extends BaseUser {}

const SuperAdminModel = mongoose.model<SuperAdmin & mongoose.Document>(
    UserType.SUPER_ADMIN,
    new mongoose.Schema({})
);

export default SuperAdminModel;