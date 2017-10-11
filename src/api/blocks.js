import resource from 'resource-router-middleware';
import readError from '../lib/read-error';
import Block from '../models/block';
import { knownPublicKeys, knownAddresses } from '../lib/knowns';

export default () => resource({

    id : 'block',

    /** GET / - List all entities */
    index({ query }, res) {
        let status;
        let offset;
        let limit;
        let response;
        // define response and status
        if (query.sort === 'height:desc' && query.publicKey !== 'invalid_pk') {
            status = 200;
            const limit = query.limit || 1;
            const blockList = [];
            for (let i = 0; i < limit; i++) {
                blockList.push(Block(i, query.generatorPublicKey));
            }
            response = { blocks: blockList };
            // getting top accounts
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
