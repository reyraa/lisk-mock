import resource from 'resource-router-middleware';
import readFile from '../lib/read-file';

export default () => resource({

    id : 'transactions',

    /** GET / - List all entities */
    index({ query }, res) {
        let response;
        let status;
        let file;
        // define response and status
        if (query.senderId === '16313739661670634666L') {
            status = 200;
            file = '200-sender';
        } else if (query.recipientId === '16313739661670634666L') {
            status = 200;
            file = '200-recipient';
        } else if (query.senderId == undefined && query.recipientId == undefined) {
            status = 400;
            file = '200-sender';
        } else if (query.senderId === '999999999L' || query.recipientId === '999999999L') {
            status = 204;
            file = status;
        } else if (query.senderId instanceof Array || query.senderId.constructor === Array ||
            query.recipientId instanceof Array || query.recipientId.constructor === Array) {
            status = 409;
            file = status;
        } else {
            status = 404;
            file = status;
        }
        console.log('T status', file, query);
        readFile('transactions', file, (err, data) => {
            res.status(status);
            response = data;
            res.json(response);
        });
    },
});
