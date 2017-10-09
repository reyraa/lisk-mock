import resource from 'resource-router-middleware';
import readFile from '../lib/read-file';

export default () => resource({

    id : 'delegates',

    /** GET / - List all entities */
    index({ query }, res) {
        console.log('publicKey', query);
        let response;
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
        console.log('D status', status, query);
        readFile('delegates', status, (err, data) => {
            res.status(status);
            response = data;
            res.json(response);
        });
    },
});
