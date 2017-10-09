import { version } from '../../package.json';
import { Router } from 'express';
import account from './account';
import delegate from './delegate';

export default ({ config }) => {
    let api = Router();

    /**
     * App routes
     */
    api.use('/accounts', account({ config }));
    // api.use('/delegate', delegate({ config }));

    // only returns Api meta data
    api.get('/', (req, res) => {
        res.json({ version });
    });

    return api;
}
