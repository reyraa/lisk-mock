import resource from 'resource-router-middleware';
import readError from '../lib/read-error';
import Forger from '../models/forger';

export default () => resource({

    id : 'forgers',

    /** GET / - List all entities */
    index({ query }, res) {
        let status;
        let limit;
        let response;
        // define response and status
        if (!query.limit || query.limit > 0) {
            status = 200;
            response = {
                count: limit,
                currentBlockSlot: 4368793,
                currentSlot: 4368793,
                delegates: [],
            };
            limit = query.limit < 101 ? query.limit : 101;
            for (let i = 0; i < limit; i++) {
                response.delegates.push(Forger(i));
            }
        } else if (query.limit === 0) {
            status = 204;
        } else {
            status = 404;
        }

        res.status(status);
        if (status === 200) {
            res.json(response);
        } else {
            readError(status, (err, data) => {
                res.json(data);
            });
        }
    },
});
