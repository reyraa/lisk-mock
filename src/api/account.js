import resource from 'resource-router-middleware';
import readError from '../lib/read-error';
import Account from '../models/account';

export default () => resource({

    id : 'account',

    /** GET / - List all entities */
    index({ query }, res) {
        let status;
        let offset;
        let limit;
        // define response and status
        if (query.address === '16313739661670634666L' || query.publicKey === 'c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab6f') {
            status = 200;
            // getting top accounts
        } else if (query.sort === '-balance') {
            offset = query.offset || 0;
            limit = query.limit > 0 ? query.limit : 100;
            if (offset > 100000) {
                limit = 0;
            }
            status = 200;
        } else if (query.address === '999999999L' || query.publicKey === 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff') {
            status = 204;
        } else if ((query.address === 'L' || query.address == undefined) && (query.publicKey === 'invalid_pk' || query.publicKey == undefined)) {
            status = 400;
        } else if (query.address instanceof Array || query.address.constructor === Array) {
            status = 409;
        } else {
            status = 404;
        }

        res.status(status);
        if (status === 200 && query.sort !== '-balance') {
            const response = { accounts: [Account(0)] };
            res.json(response);
        } else if (status === 200 && query.sort === '-balance') {
            const accountList = [];
            for (let i = offset%100; i < limit; i++) {
                accountList.push(Account(i));
            }
            const response = { accounts: accountList };
            res.json(response);
        } else {
            readError(status, (err, data) => {
                res.json(data);
            });
        }
    },
});
