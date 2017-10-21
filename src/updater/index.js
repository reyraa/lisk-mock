import { Router } from 'express';
import diff from './diff';
import compare from './compare';

export default ({ config }) => {
    const api = Router();

    /**
     * updater routes
     */
    api.use('/diff', diff({ config }));
    api.use('/compare', compare({ config }));

    return api;
}
