import resource from 'resource-router-middleware';
import readError from '../lib/read-error';
import Voter from '../models/voter';
import { knownPublicKeys } from '../lib/knowns';

export default () => resource({

    id : 'voters',

    /** GET / - List all entities */
    index({ query }, res) {
        let status;
        // define response and status
        if (knownPublicKeys.includes(query.publicKey)) {
            status = 200;
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
            res.json(Voter(0));
        } else {
            readError(status, (err, data) => {
                res.json(data);
            });
        }
    },
});
