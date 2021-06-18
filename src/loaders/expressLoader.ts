import express from 'express';
import { Response, Request, NextFunction, Router } from 'express';
import log from '../utils/winston';
import container from "../utils/containerCI";
import Controller from "../types/classes/Controller";

function loadControllers(): Router {
    const router = Router();
    const controllers = container.getAll<Controller>(Types.CONTROLLER);
    log.info('Load controllers');
    controllers.forEach(controller => {
        log.info(controller.constructor.name.toString());
        router.use('/', controller.getRouter());
    });
    log.info('Controllers loaded');
    return router;
}


export default async (app: express.Application): Promise<void> => {
    app.use('/', (req: Request, res: Response, next: NextFunction) =>
        res.status(404).send({ message: 'Wrong path' })
    );
    app.use('/api', loadControllers());
    app.on('uncaughtException', error => log.error(error.stack));
    app.on('unhandledRejection', error => log.warn(error.stack));
};