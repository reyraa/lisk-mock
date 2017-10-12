import { version } from '../../package.json';
import { Router } from 'express';
import account from './account';
import delegate from './delegate';
import forging from './forging';
import votes from './votes';
import voters from './voters';
import blocks from './blocks';
import transactions from './transactions';
import unsigned from './unsigned';
import forgers from './forgers';

export default ({ config }) => {
    let api = Router();

    /**
     * App routes
     */
    api.use('/accounts', account({ config }));
    api.use('/delegates/forging', forging({ config }));
    api.use('/delegates', delegate({ config }));
    api.use('/votes', votes({ config }));
    api.use('/voters', voters({ config }));
    api.use('/transactions/unsigned', unsigned({ config }));
    api.use('/transactions', transactions({ config }));
    api.use('/blocks', blocks({ config }));
    api.use('/delegates/forgers', forgers({ config }));

    // only returns Api meta data
    api.get('/', (req, res) => {
        res.json({ version });
    });

    return api;
}
