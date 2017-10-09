import resource from 'resource-router-middleware';
import readFile from '../lib/read-file';

export default () => resource({

    id : 'delegates',

    /** GET / - List all entities */
    index({ query }, res) {
        let response;
        let status;
        // define response and status
        if (query.address === '8273455169423958419L' || query.publicKey === 'c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab6f') {
            status = 200;
        } else if (query.address === 'L' || query.address == undefined) {
            status = 400;
        } else if (query.address === '999999999L') {
            status = 204;
        } else if (query.address instanceof Array || query.address.constructor === Array) {
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
