import {NextFunction, Router} from "express";
import {inject, injectable, named} from "inversify";
import passport from "passport";
import{IVerifyOptions} from "passport-local";
import AuthService from "../../services/AuthService";
import {BaseModel} from "classes/BaseModel";
import Controller from "../../types/classes/Controller";
import DITags from "../../types/enums/DITags";
import DITypes from "../../types/enums/DITypes";
import NotImplementedError from "../../types/exceptions/NotImplementedError";
import Authorizable from "interfaces/Authorizable";
import log from "winston";
import {User} from "../../models/users/User";

@injectable()
class AuthController extends Controller {

    @inject(DITypes.SERVICE)
    @named(DITags.AUTH)
    private authService: AuthService;

    public router = Router();
    public path = "/auth";

    constructor() {
        super();
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        // @ts-ignore
        this.router.post(this.path, this.localAuth);
    }



    localAuth = async (req: Request, res: Response, next: NextFunction) =>  {
        log.info("test_1");
        log.info("local auth function");
        try {
            passport.authenticate("local",
                { session: false },
                async (
                    err: Error,
                    eClient: Authorizable & BaseModel,
                    info: IVerifyOptions,
                ) => {
                    log.info("test_2");
                    try {
                        if (err) {
                            return next(err);
                        }
                        log.info("test_3");
                        if (!eClient) {
                            // @ts-ignore
                            return await res.json("no credentials provided");
                        }
                        else {
                            log.info("test_4");
                            // @ts-ignore
                            req.login(eClient, {session: false}, async () => {
                                if (err) {
                                    throw new NotImplementedError(
                                        "Not implemented error!",
                                    );
                                }
                                log.info("Session preparation");
                                const session = await this.authService.generateToken(
                                    this.getPayload(eClient),
                                );
                                // @ts-ignore
                                return res.json(session);
                            });
                        }
                    } catch (e) {
                        return next(e);
                    }
                },
            )(req, res, next);
        } catch (e) {
            return next(e);
        }
    };

    private getPayload(user: Authorizable & BaseModel) {// для компановка refresh tokena
        return {
            userId: user._id,
            type: "",
            role: user.type,
        };
    }
}

export default AuthController;