import { BaseModel } from "../../types/classes/BaseModel";
import Authorizable from "../../types/interfaces/Authorizable";
import UserType from "../../types/enums/UserType";
import mongoose from 'mongoose';
import uniqueValidator from "mongoose-unique-validator";
let bcrypt = require('bcryptjs');

type comparePasswordFunction = (
    candidatePassword: string,
    cb: (err: mongoose.Error, isMatch: boolean) => void
) => void;

export class BaseUser extends BaseModel implements Authorizable {
    email: string;
    password: string;
    username: string;
    isVerified: boolean;
    comparePassword: comparePasswordFunction;
    type: UserType;
}

export const baseUserSchema = new mongoose.Schema(
    {
    username: { type: String, default: "", unique: true, required: true },
    email: { type: String, default: "" },
    password: { type: String },
    isVerified: { type: Boolean, default: false },
    type: { type: String, required: true, immutable: true },
    },
);
baseUserSchema.plugin(uniqueValidator);


baseUserSchema.pre("save", function(next) {
    const user = this as BaseUser & mongoose.Document;

    if (!user.isModified("password")) {
        return next();
    }

    if (!user.password) {
        return next();
    }

    bcrypt.genSalt(10, (err: mongoose.Error, salt: any) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(
            user.password,
            salt,
            null,
            (err: mongoose.Error, hash: string) => {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            }
        );
    });
});

baseUserSchema.pre("findOneAndUpdate", function(next) {
    const user: any = this;

    if (!user._update || !user._update.password) {
        return next();
    }

    bcrypt.genSalt(10, (err: mongoose.Error, salt: any) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(
            user._update.password,
            salt,
            null,
            (err: mongoose.Error, hash: string) => {
                if (err) {
                    return next(err);
                }
                user._update.password = hash;
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

baseUserSchema.methods.comparePassword = comparePassword;

const BaseUserModel = mongoose.model<BaseUser & mongoose.Document>("BaseUser", baseUserSchema);
export default BaseUserModel;
