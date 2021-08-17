import requireDir from "require-dir";
import UserType from "../types/enums/UserType";
import UserModel from "../models/users/User";
import log from "./winston";
import mongooseLoader from "../loaders/mongooseLoader";
import AdminModel from "../models/users/Administrator";
import SuperAdminModel from "../models/users/SuperAdmin";
import ShopModel from "../models/business/Shop";
import MasterModel from "../models/business/Master";
import TeamModel from "../models/business/Team";
import MeasurerModel from "../models/business/Measurer";
import DesignerModel from "../models/business/Designer";

const initJson = requireDir("../../data");


const loadUsers = async (): Promise<void> => {
    initJson.users.map((user: { type: UserType }) => {
        if (user.type === UserType.USER)
            new UserModel(user).save();

        if (user.type === UserType.ADMIN)
            new AdminModel(user).save();

        if (user.type === UserType.SUPER_ADMIN)
            new SuperAdminModel(user).save();
    });
};

const loadSellers = async(): Promise<void> => {
    initJson.sellers.map((seller: {type: UserType}) => {
        if (seller.type === UserType.SHOP)
            new ShopModel(seller).save();

        if (seller.type === UserType.MASTER)
            new MasterModel(seller).save();

        if (seller.type === UserType.MEASURER)
            new MeasurerModel(seller).save();

        if (seller.type === UserType.DESIGNER)
            new DesignerModel(seller).save();

        if (seller.type === UserType.TEAM)
            new TeamModel(seller).save();
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