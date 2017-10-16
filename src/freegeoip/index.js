import { version } from '../../package.json';
import { Router } from 'express';
import Json from './json';

export default ({ config }) => {
    const api = Router();

    /**
     * FreeGeoIp routes
     */
    api.use('/json', Json({ config }));

    // only returns Api meta data
    api.get('/', (req, res) => {
        res.json({ version });
    });

    return api;
}
