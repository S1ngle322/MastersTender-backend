import BaseSellerModel, {BaseSeller} from "./BaseSeller";
import mongoose from "mongoose";
import UserType from "enums/UserType";
import MasterModel from "./Master";
import {BaseModel} from "classes/BaseModel";

export class Measurer extends MasterModel{}

const MeasurerModel = BaseSellerModel.discriminator<Measurer & mongoose.Document>(
    UserType.MEASURER,
    new mongoose.Schema({})
);

export default MeasurerModel;