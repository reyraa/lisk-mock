import resource from 'resource-router-middleware';
import readError from '../lib/read-error';

export default () => resource({

    id : 'nextForgers',

    /** GET / - List all entities */
    index({ query }, res) {
        let status;
        let limit;
        let response;
        // define response and status
        if (!query.limit || query.limit > 0) {
            status = 200;
            response = {
                currentBlock: 28680,
                currentBlockSlot: 4368793,
                currentSlot: 4368793,
                delegates: [],
            };
            limit = query.limit < 101 ? query.limit : 101;
            for (let i = 0; i < limit; i++) {
                response.delegates.push(`c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab${i}f`);
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
