import BaseSellerModel, {BaseSeller, baseSellerSchema} from "./BaseSeller";
import mongoose from "mongoose";
import UserType from "../../types/enums/UserType";

export class Master extends BaseSeller {}

const MasterModel = BaseSellerModel.discriminator<Master & mongoose.Document>(
    UserType.MASTER,
    new mongoose.Schema({})
);

export default MasterModel;

