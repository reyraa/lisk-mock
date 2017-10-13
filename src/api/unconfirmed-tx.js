import resource from 'resource-router-middleware';
import readError from '../lib/read-error';
import UnconfirmedTx from '../models/unconfirmedTx';
import { knownAddresses } from '../lib/knowns';

export default () => resource({

    id : 'unconfirmedTx',

    /** GET / - List all entities */
    index({ query }, res) {
        let status;
        let response;
        // define response and status
        if (typeof query.id === 'string' && query.id.length > 10) {
            status = 200;
            response = {
                transactions: UnconfirmedTx(0, query.id),
                count: 1,
            };
        } else if (Object.keys(query).length === 0) {
            status = 200;
            const transactions = [];
            for (let i = 0; i < 10; i++) {
                transactions.push(UnconfirmedTx(i));
            }
            response = {
                transactions,
                count: 10,
            };
        } else if (query.senderId == undefined && query.recipientId == undefined) {
            status = 400;
        } else if (query.senderId instanceof Array || query.senderId.constructor === Array ||
            query.recipientId instanceof Array || query.recipientId.constructor === Array) {
            status = 409;
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
