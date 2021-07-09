import { BaseUser } from './BaseUser';
import Authoraziable from '../../types/interfaces/Authorizable';
import mongoose from 'mongoose';
import BaseUserModel from './BaseUser';
import UserType from '../../types/enums/UserType';

export class User extends BaseUser implements Authoraziable {
    name: string;
    surname: string;
    middle_name: string;
    age: number;
    position: string;
    work_experience: number;
    martial_status: string;
    amount_of_children: number;
    country: string;
    city: string;


}

const userSchema = new mongoose.Schema(
    {
        name:                 { type: String, required: true },
        surname:              { type: String, required: true },
        middle_name:          { type: String, required: true },
        age:                 { type: Number, required: false },
        position:             { type: String, required: true },
        work_experience:    { type: Number, required: false  },
        marital_status:     { type: String, required: false  },
        amount_of_children: { type: Number, required: false  },
        country:              { type: String, required: true },
        city:                 { type: String, required: true },
    }
);

const UserModel = BaseUserModel.discriminator<User & mongoose.Document>(UserType.USER, userSchema);
export default UserModel;