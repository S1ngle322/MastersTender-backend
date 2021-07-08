import { injectable } from 'inversify';
import { Router, Request } from 'express';

abstract class Controller {

    public router: Router;

    abstract initializeRoutes(): void;

    public getRouter = (): Router => {
        return this.router;
    };

}

export default Controller;