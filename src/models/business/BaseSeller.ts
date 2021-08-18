import {BaseModel} from "../../types/classes/BaseModel";
import Authorizable from "interfaces/Authorizable";
import UserType from "../../types/enums/UserType";
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import {BaseUser, baseUserSchema} from "../users/BaseUser";
let bcrypt = require('bcryptjs');

type comparePasswordFunction = (
    candidatePassword: string,
    cb: (err: mongoose.Error, isMatch: boolean) => void
) => void;

export class BaseSeller extends BaseModel implements Authorizable {
    company_name: string;
    unp: string;//уникальный номер плательщика
    legal_address: string;
    country: string;
    city: string;
    portfolio: string;
    services: string;
    subscription_type: string;
    username: string;
    password: string;
    email: string;
    isVerified: boolean
    comparePassword: comparePasswordFunction;
    type: UserType;
}

export const baseSellerSchema = new mongoose.Schema(
    {
     company_name: {type: String, default: "", unique: true, required: true},
     unp: {type: String, unique: true, required: true},//уникальный номер плательщика
     legal_address: {type: String, default: ""},
     country: {type: String, default: ""},
     city: {type: String, default: ""},
     portfolio: {type: Array, default: ""},
     services: {type: String},
     subscription_type: {type: String, required: true},
     username: {type: String, default: "", unique: true, required: true },
     email: {type: String, default: ""},
     password: {type: String},
     isVerified: {type: Boolean, default: false},
     type: { type: String, required: true, immutable: true },
    },
    {discriminatorKey: "type", timestamps: true}
);
baseSellerSchema.plugin(uniqueValidator);

baseSellerSchema.pre("save", function (next) {
    const seller = this as BaseSeller & mongoose.Document;

    if (!seller.isModified("password")){
        return next();
    }
    if (!seller.password){
        return next();
    }

    bcrypt.genSalt(10, (err: mongoose.Error, salt: any) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(
            seller.password,
            salt,
            null,
            (err: mongoose.Error, hash: string) => {
                if (err) {
                    return next(err);
                }
                seller.password = hash;
                next();
            }
        );
    });
});

baseSellerSchema.pre("findOneAndUpdate", function(next) {
    const seller: any = this;

    if (!seller._update || !seller._update.password) {
        return next();
    }

    bcrypt.genSalt(10, (err: mongoose.Error, salt: any) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(
            seller._update.password,
            salt,
            null,
            (err: mongoose.Error, hash: string) => {
                if (err) {
                    return next(err);
                }
                seller._update.password = hash;
                next();
            }
        );
    });
});

const comparePassword: comparePasswordFunction = function(
    candidatePassword,
    cb
) {
    bcrypt.compare(
        candidatePassword,
        this.password,
        (err: mongoose.Error, isMatch: boolean) => {
            cb(err, isMatch);
        }
    );
};

baseSellerSchema.methods.comparePassword = comparePassword;

const BaseSellerModel = mongoose.model<BaseUser & mongoose.Document>("BaseSeller", baseSellerSchema);
export default BaseSellerModel;

