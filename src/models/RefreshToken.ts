import mongoose from "mongoose";
//import{ BaseModel } from "classes/BaseModel";//возможна ошибка в пути
import {User} from "./users/User";
import {BaseModel} from "classes/BaseModel";

export class RefreshToken extends BaseModel { //базовая модель для рефреш токена, для удобства
    user:User["_id"];
    value: string;
}
export const refreshTokenSchema = new mongoose.Schema(//описание RT(рефреш токен) для работы с бд
    {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                value: { type: String, default: "", required: true}//value = token
             },
    {timestamps: true},
);
const RefreshTokenModel = mongoose.model<RefreshToken & mongoose.Document>(
"RefreshToken",
refreshTokenSchema,
);
export default RefreshToken;