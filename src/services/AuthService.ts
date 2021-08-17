//В данном файле у нас генерируются рефреш токены и рефрешаться непосредственно
import {inject, injectable, named} from "inversify";
import jwt from "jsonwebtoken";
//import TokenPayload from "../types/classes/TokenPayload";
import TokenSet from "classes/TokenSet";
import Tags from "../types/enums/DITags";
import Types from "enums/DITypes";
import {
    JWT_ACCESS_LIFETIME,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_LIFETIME,
    JWT_REFRESH_SECRET
} from "../utils/secrets";
import RefreshTokenService from "./RefreshTokenService";
import TokenPayload from "classes/TokenPayload";

@injectable()
class AuthService {
    @inject(Types.SERVICE)
    @named(Tags.REFRESH_TOKEN)
    private refreshTokenService: RefreshTokenService;

    public async generateToken(payload: TokenPayload) {
        const accessToken = jwt.sign(
        {...payload, type: "access"},
                JWT_ACCESS_SECRET,
            {expiresIn: JWT_ACCESS_LIFETIME},
        );

        const refreshToken = jwt.sign(
            {...payload, type: "refresh"},
            JWT_REFRESH_SECRET,
            {expiresIn: JWT_REFRESH_LIFETIME}
        );

        await this.refreshTokenService.deleteUserRefreshToken(payload.userId);
        await this.refreshTokenService.createUserRefreshToken(
            payload.userId,
            refreshToken,
        );

        const resultDTO: TokenSet = {
            accessToken,
            type: payload.type,
            expiresIn: JWT_ACCESS_LIFETIME,
            refreshToken,
        };

        return resultDTO;
    }
}

export default AuthService;