import resource from 'resource-router-middleware';
import Fetcher from './fetcher';

export default () => resource({

    id : 'compare',

    load(req, _id, callback) {
        callback(null, _id);
    },

    read({ compare }, res) {
        const fetcher = new Fetcher();
        fetcher.init(compare, (result, err) => {
            if (!err) {
                const docs = result[1];
                const model = result[0];
                const compareResult = { docs, model };

                res.status(200);
                res.json(compareResult);
            } else {
                res.status(500);
                res.json({
                    message: 'Error updating models'
                });
            }
        });
    },

    /** GET / - List all entities */
    index(req, res) {
        const fetcher = new Fetcher();
        fetcher.init(null, (result, err) => {
            if (!err) {
                const compare = {};

                Object.keys(result).forEach((name) => {
                    const docs = result[name][1];
                    const model = result[name][0];
                    compare[name] = { docs, model };
                });

                res.status(200);
                res.json(compare);
            } else {
                res.status(500);
                res.json({
                    message: 'Error updating models'
                });
            }
        });
    }
});
