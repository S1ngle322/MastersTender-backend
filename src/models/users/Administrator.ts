import { BaseUser } from "./BaseUser";
import mongoose from "mongoose";
import UserType from "../../types/enums/UserType";

export class Admin extends BaseUser {}

const AdminModel = mongoose.model<Admin & mongoose.Document>(
    UserType.ADMIN,
    new mongoose.Schema({})
);

export default AdminModel;