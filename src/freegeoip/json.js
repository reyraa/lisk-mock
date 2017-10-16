

import resource from 'resource-router-middleware';

export default () => resource({

    id : 'json',

    load(req, _id, callback) {
        callback(null, _id);
    },

    /** GET / - List all entities */
    index(req, res) {
        res.status(200);
        res.json({
            hostname: 'hostname',
            country_name: 'germany'
        });
    },

    /** GET /:id - Return a given entity */
    read(req, res) {
        res.json({
            hostname: 'hostname',
            country_name: 'germany'
        });
    },
});
