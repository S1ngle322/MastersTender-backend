import BaseSellerModel, {BaseSeller} from "./BaseSeller";
import mongoose from "mongoose";
import UserType from "../../types/enums/UserType";
import MasterModel from "./Master";
import {BaseModel} from "classes/BaseModel";

export class Designer extends MasterModel{}

const DesignerModel = BaseSellerModel.discriminator<Designer & mongoose.Document>(
    UserType.DESIGNER,
    new mongoose.Schema({})
);

export default DesignerModel;