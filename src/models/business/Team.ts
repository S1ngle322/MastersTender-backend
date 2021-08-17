import BaseSellerModel, {BaseSeller} from "./BaseSeller";
import mongoose from "mongoose";
import UserType from "enums/UserType";
import MasterModel from "./Master";
import {BaseModel} from "classes/BaseModel";

export class Team extends MasterModel{}

const TeamModel = BaseSellerModel.discriminator<Team & mongoose.Document>(
    UserType.TEAM,
    new mongoose.Schema({})
);

export default TeamModel;