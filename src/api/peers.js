import resource from 'resource-router-middleware';
import readError from '../lib/read-error';
import Peer from '../models/peer';

export default () => resource({

    id : 'peer',

    /** GET / - List all entities */
    index({ query }, res) {
        let status;
        const response = { peers: [] };
        // define response and status
        if (query.sort === 'ip:asc') {
            status = 200;
            const offset = query.offset || 0;
            const limit = query.limit || 101;
            const max = parseInt(limit) + parseInt(offset);
            for (let i = offset; i < max; i++) {
                response.peers.push(Peer(i));
            }
            response.totalReturned = limit;
            response.totalCount =  limit + 120;
        } else if (query.ip == undefined) {
            status = 400;
        } else if (query.ip === 'invalid_ip') {
            status = 204;
        } else if (query.ip instanceof Array || query.ip.constructor === Array) {
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
