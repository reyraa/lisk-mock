import resource from 'resource-router-middleware';
import readError from '../lib/read-error';
import Delegate from '../models/delegate';

export default () => resource({

    id : 'delegates',

    /** GET / - List all entities */
    index({ query }, res) {
        let status;
        // define response and status
        if (query.publicKey === 'c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab6f') {
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
            const response = { delegates: [Delegate(0)] };
            res.json(response);
        } else {
            readError(status, (err, data) => {
                res.json(data);
            });
        }
    },
});
