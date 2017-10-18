import resource from 'resource-router-middleware';
import readError from '../lib/read-error';
import Delegate from '../models/delegate';
import { knownPublicKeys } from '../lib/knowns';


/**
 * @param {*} pk publicKey
 * @param {*} address Address
 * @param {*} q Query for search
 * @param {*} limit The maximum number of delegates returned
 */
const createDelegateList = (pk, address, q, limit, offset) => {
    let count = 303;
    const delegateList = [];
    if (pk) {
        limit = limit || 101;
        count = 1;
        let givenIdParts;
        if (address) {
            givenIdParts = address.replace('L', '').split('6346');
        } else {
            givenIdParts = pk.replace(/f$/, '').split('0f18ab');
        }
        const i = givenIdParts.length === 2 ? givenIdParts[0] : 0;
        delegateList.push(Delegate(i, q));
    } else if (q && q.length > 0) {
        limit = 10 - q.length;
        count = limit;
        for (let i = 0; i < limit; i++) {
            delegateList.push(Delegate(i, q));
        }
    } else {
        limit = limit | 101;
        offset = offset | 0;
        const max = parseInt(limit) + parseInt(offset);

        for (let i = offset; i < max; i++) {
            delegateList.push(Delegate(i));
        }
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
            response = createDelegateList(null, null, null, query.limit, query.offset);
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
