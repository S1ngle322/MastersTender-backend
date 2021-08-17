import { inject, injectable, named} from "inversify";
import { RefreshToken } from "../models/RefreshToken"
import RefreshTokenRepository from "../repositories/RefreshTokenRepository";
//import DITags from "../types/enums";
import DITypes from "enums/DITypes";
import DITags from "enums/DITags";

@injectable()
    class RefreshTokenService {
    @inject(DITypes.REPOSITORY) //непонятно почему здесь inject и зачем мы это делаем
    @named(DITags.REFRESH_TOKEN)
    private refreshTokenRepository: RefreshTokenRepository;// что это?

    public async createUserRefreshToken(
        user: string,
        token: string,
    ): Promise<RefreshToken>{//??
        let newToken: RefreshToken = new RefreshToken();//всю жизнь не могу понять зачем нужно нью и про объекты тоже вопросик имеется
        newToken.user = user;//что есть точка?
        newToken.value = token;
        newToken = await this.refreshTokenRepository.create(newToken);

        return newToken;
    }

    public async deleteUserRefreshToken(
        userID: string,
    ): Promise<RefreshToken[]>{//почему здесь массив, а в предыдущем случае нет
        return await this.refreshTokenRepository.delete({
            user: userID,
        } as RefreshToken);
    }
}

export default RefreshTokenService;