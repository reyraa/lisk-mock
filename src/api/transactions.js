import resource from 'resource-router-middleware';
import readError from '../lib/read-error';
import Transaction from '../models/transaction';

export default () => resource({

    id : 'transactions',

    /** GET / - List all entities */
    index({ query }, res) {
        let status;
        let renderIndex;
        let recipientIndex;
        const knownIds = [
            '1631373966167063460L',
            '16313739661670634666L',
        ];
        // define response and status
        if (knownIds.includes(query.senderId)) {
            status = 200;
            renderIndex = 0;
            recipientIndex = 1;
        } else if (knownIds.includes(query.recipientId)) {
            status = 200;
            renderIndex = 1;
            recipientIndex = 0;
        } else if (query.senderId === '999999999L' || query.recipientId === '999999999L') {
            status = 204;
        } else if (query.senderId == undefined && query.recipientId == undefined) {
            status = 400;
            renderIndex = 0;
            recipientIndex = 1;
        } else if (query.senderId instanceof Array || query.senderId.constructor === Array ||
            query.recipientId instanceof Array || query.recipientId.constructor === Array) {
            status = 409;
        } else {
            status = 404;
        }

        res.status(status);
        if (status === 200) {
            const response = {
                transactions: [Transaction(renderIndex, recipientIndex)],
                count: 1,
            };
            res.json(response);
        } else {
            readError(status, (err, data) => {
                res.json(data);
            });
        }
    },
});
