import {Strategy as LocalStrategy} from 'passport-local';
import passport from 'passport';
import UserModel from "../../models/users/User";
import ValidationError from "../../types/exceptions/ValidationError";
import EntityNotFoundError from '../../types/exceptions/EntityNotFoundError';
import log from "../../utils/winston";
import UserEnum from "enums/UserType";


passport.serializeUser<any, any>((user, cb) => {
    // @ts-ignore
    cb(undefined, user._id);
});

passport.deserializeUser((id, cb) => {
    UserModel.findById(id, (err: any, user: {}) => {
        cb(err, user);
    });
});

const auth = async () => {
    passport.use(
        new LocalStrategy(
            { usernameField: 'email', passwordField: 'password' },
            async (email, password, cb) => {
                try {
                    log.info("Strategy checking");
                    const eClient = await UserModel.findOne({
                        email: email.toLowerCase()
                    }).exec();

                    if (!eClient) {
                        throw new ValidationError(
                            'User does not exist in the database'
                        );
                    } else {
                        if (!eClient.isVerified) {
                            throw new EntityNotFoundError(
                                'User is not verified!'
                            );
                        }

                        eClient.comparePassword(
                            password,
                            (err: Error, isMatch: boolean) => {
                                if (err) {
                                    throw new Error(
                                        err.message
                                    );
                                }
                                if (isMatch) {
                                    return cb(null, eClient.toObject());
                                }
                                return cb(
                                    new ValidationError('Wrong Password!')
                                );
                            }
                        );
                        return eClient;
                    }
                } catch (e) {
                    return cb(e);
                }
            }
        )
    );
};



export default auth;