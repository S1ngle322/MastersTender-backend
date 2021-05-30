import { BaseModel } from "../types/classes/BaseModel";
import Authorizable from "../types/interfaces/Authorizable";
import UserType from "../types/enums/UserType";
import mongoose from "mongoose";

import uniqueValidator from "mongoose-unique-validator";

// TODO: решить, мне точно здесь нужен класс или мб переместить в types? ++ если что, вставить функцию сравнивания/хеширования паролей
export class User extends BaseModel implements Authorizable {
    email: string;
    password: string;
    name: string;
    surname: string;
    middle_name: string;
    //TODO company: Company
    isVerified: boolean;
    type: UserType;
}


export const userSchema = new mongoose.Schema(
    {
        email: { type: String, unique: true },
        password: { type: String },
        name: { type: String },
        surname: { type: String },
        middle_name: { type: String },
        // company: { type: String }, TODO: company type???
        isVerified: { type: Boolean, default: false },
        type: { type: String, required: true, immutable: true },
    },
);
userSchema.plugin(uniqueValidator);


const UserModel = mongoose.model<User & mongoose.Document>('User', userSchema);
export default UserModel;