import resource from 'resource-router-middleware';
import readError from '../lib/read-error';
import Account from '../models/account';
import { knownPublicKeys, knownAddresses } from '../lib/knowns';

export default () => resource({

    id : 'account',

    /** GET / - List all entities */
    index({ query }, res) {
        let status;
        let offset;
        let limit;
        let response;
        // define response and status
        if (knownAddresses.includes(query.address) || knownPublicKeys.includes(query.publicKey)) {
            status = 200;
            response = { accounts: [Account(0)] };
            // getting top accounts
        } else if (query.sort === '-balance') {
            status = 200;
            offset = query.offset || 0;
            limit = query.limit > 0 ? query.limit : 100;
            if (offset > 100000) {
                limit = 0;
            }

            const accountList = [];
            for (let i = offset%100; i < limit; i++) {
                accountList.push(Account(i));
            }
            response = { accounts: accountList };
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
        if (status === 200) {
            res.json(response);
        } else {
            readError(status, (err, data) => {
                res.json(data);
            });
        }
    },
});
