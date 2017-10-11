import resource from 'resource-router-middleware';
import readError from '../lib/read-error';
import Delegate from '../models/delegate';
import { knownPublicKeys } from '../lib/knowns';


const createDelegateList = (pk, address, q, limit) => {
    let count = 303;
    if (pk || address) {
        limit = limit || 101;
        count = 1;
    } else if (q && q.length > 0) {
        console.log(q, 13 - q.length)
        limit = 10 - q.length;
        count = limit;
    }
    const delegateList = [];
    for (let i = 0; i < limit; i++) {
        delegateList.push(Delegate(i, q));
    }
    return { delegates: delegateList, count };
}

export default () => resource({

    id : 'delegates',

    /** GET / - List all entities */
    index({ query }, res) {
        let status;
        let response;

        // define response and status
        if ((typeof query.publicKey === 'string' && query.publicKey !== 'invalid_pk') ||
            (typeof query.address === 'string' && query.publicKey !== 'L')) {
            status = 200;
            response = createDelegateList(query.publicKey, query.address);
        } else if (query.q && query.q.length > 0) {
            if (query.q.length < 12) {
                status = 200;
                response = createDelegateList(null, null, query.q);
            } else {
                status = 204;
            }
        } else if (query.sort === 'rate:asc') {
            status = 200;
            response = createDelegateList(null, null, null, query.limit);
        } else if (query.publicKey == undefined) {
            status = 400;
        } else if (query.publicKey === 'invalid_pk') {
            status = 204;
        } else if (query.publicKey instanceof Array || query.publicKey.constructor === Array) {
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
