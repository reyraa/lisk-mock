import resource from 'resource-router-middleware';
import readError from '../lib/read-error';
import Transaction from '../models/transaction';
import { knownAddresses } from '../lib/knowns';

const addressRegex = /^[0-9]{10,21}[L]$/;

export default () => resource({

    id : 'transactions',

    /** GET / - List all entities */
    index({ query }, res) {
        let status;
        let response;
        // define response and status
        if (typeof query.id === 'string' && query.id.length > 10 && !addressRegex.test(query.id)) {
            console.log('GOT');
            status = 200;
            response = {
                transactions: [Transaction(0, 1, null, query.id)],
                count: 1,
            };
        } else if (knownAddresses.includes(query.senderId)) {
            status = 200;
            response = {
                transactions: [Transaction(0, 1)],
                count: 1,
            };
        } else if (knownAddresses.includes(query.recipientId)) {
            status = 200;
            response = {
                transactions: [Transaction(1, 0)],
                count: 1,
            };
        // registration transactions
        } else if (query.sort === 'timestamp:desc') {
            status = 200;
            const count = 20;
            const transactionList = [];
            for (let i = 0; i < count; i++) {
                transactionList.push(Transaction(i, null, query.type));
            }
            response = {
                transactions: transactionList,
                count,
            };
        } else if (query.senderId === '999999999L' || query.recipientId === '999999999L' || typeof query.id === 'string') {
            status = 204;
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
