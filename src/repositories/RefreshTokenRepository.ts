import { injectable } from "inversify";
import BaseRepository from "./BaseRepository";
import RefreshToken from "../models/RefreshToken";

@injectable()//
class RefreshTokenRepository extends BaseRepository<RefreshToken> {
    public constructor() {
        super("RefreshToken");
    }
}

export default RefreshTokenRepository;