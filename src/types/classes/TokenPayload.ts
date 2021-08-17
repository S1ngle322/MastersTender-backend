import UserEnum from "enums/UserType";

class TokenPayload {
    userId: string;
    type:string;
    role: UserEnum;
}

export default TokenPayload;