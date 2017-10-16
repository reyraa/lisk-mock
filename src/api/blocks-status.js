import resource from 'resource-router-middleware';
import BlocksStatus from '../models/blocks-status';

export default () => resource({

    id : 'blocksStatus',

    /** GET / - List all entities */
    index(req, res) {
        res.status(200);
        res.json(BlocksStatus());
    },
});
