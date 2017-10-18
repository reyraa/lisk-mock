import resource from 'resource-router-middleware';
import readError from '../lib/read-error';
import Block from '../models/block';
import { knownPublicKeys, knownAddresses } from '../lib/knowns';

const addressRegex = /^[0-9]{15,21}[L]$/;

export default () => resource({

    id : 'block',

    /** GET / - List all entities */
    index({ query }, res) {
        let status;
        let response;
        // define response and status
        if (typeof query.height === 'string' && query.height > 0 && !addressRegex.test(query.height)) {
            status = 200;
            response = { blocks: [Block({ height: query.height, i: 0 })], count: 1 };
        } else if (typeof query.blockId === 'string' && query.blockId.length > 10 && !addressRegex.test(query.blockId)) {
            status = 200;
            response = { blocks: [Block({ blockId: query.blockId })], count: 1 };
        } else if (query.sort === 'height:desc') {
            status = 200;
            const limit = query.limit || 1;
            const offset = query.offset || 0;
            const blockList = [];
            const max = parseInt(limit) + parseInt(offset);
            console.log('From ', offset, ' to ', max);
            for (let i = offset; i < max; i++) {
                blockList.push(Block({ i, publicKey: query.publicKey }));
            }
            response = { blocks: blockList, count: limit };
            // getting top accounts
        } else if (typeof query.blockId === 'string' || typeof query.height === 'string') {
            status = 204;
        } else if (query.blockId === 'invalid_blockId' || query.blockId == undefined) {
            status = 400;
        } else if (query.blockId instanceof Array || query.blockId.constructor === Array) {
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
