import BaseSellerModel, {BaseSeller} from "./BaseSeller";
import mongoose from "mongoose";
import UserType from "../../types/enums/UserType";

export class Shop extends BaseSeller {}

const ShopModel = BaseSellerModel.discriminator<Shop & mongoose.Document>(
    UserType.SHOP,
    new mongoose.Schema({})
);

export default ShopModel;