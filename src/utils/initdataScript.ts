import requireDir from "require-dir";
import UserType from "../types/enums/UserType";
import UserModel from "../models/users/User";
import log from "./winston";
import mongooseLoader from "../loaders/mongooseLoader";

const initJson = requireDir("../../data");


const loadUsers = async (): Promise<void> => {
    initJson.users.map((user: { type: UserType }) => {

        if (user.type === UserType.USER)
            new UserModel(user).save();

    });
};

const initData = async (): Promise<void> => {
    await loadUsers();
    log.info("Finished loading init data");
};

const loadInitData = async (): Promise<void> => {
    await mongooseLoader();
    log.info("MongoDb loaded");
    log.info("Start loading init data");
    await initData();
};

loadInitData();