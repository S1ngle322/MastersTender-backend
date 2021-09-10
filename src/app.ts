import express from 'express';
import log from './utils/winston';
import load from './loaders/index';
import "reflect-metadata";

const startServer = async (): Promise<void> => {
    const app = express();
    app.set('port', process.env.PORT || 3000);
    const host = '0.0.0.0';
    await load(app);

    app.listen(app.get('port'), host, () => {
        log.info(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
        log.info('Press CTRL-C to stop!\n');
    });
};

startServer();
