import { Container } from "inversify";
import AuthController from "../api/controllers/AuthController";
import DITypes from "../types/enums/DITypes";
import DITags from "../types/enums/DITags";
import RefreshTokenRepository from "../repositories/RefreshTokenRepository";
import AuthService from "../services/AuthService";
import RefreshTokenService from "../services/RefreshTokenService";
import "reflect-metadata";

const container = new Container();

//controllers

container
    .bind<AuthController>(DITypes.CONTROLLER)
    .to(AuthController)
    .whenTargetNamed(DITags.AUTH);

//repositories

container
    .bind<RefreshTokenRepository>(DITypes.REPOSITORY)
    .to(RefreshTokenRepository)
    .whenTargetNamed(DITags.REFRESH_TOKEN)

//services

container
    .bind<AuthService>(DITypes.SERVICE)
    .to(AuthService)
    .whenTargetNamed(DITags.AUTH);

container
    .bind<RefreshTokenService>(DITypes.SERVICE)
    .to(RefreshTokenService)
    .whenTargetNamed(DITags.REFRESH_TOKEN);



export default container;