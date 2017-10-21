import resource from 'resource-router-middleware';
import Fetcher from './fetcher';

/**
 * Gets an array of latest docs model and the current mocked version
 * compares the keys and returns the differences
 *
 * @param {Array} values -0: the model object fetched from online docs
 *                        1: the mocked model object
 * @returns {Object} - {added: [keys], removed: [keys]}
 */
const getDiff = (values) => {
    console.log('getDiff', values);
    const model = values[0];
    const docs = values[1];
    const currentDiff = {
        added: [],
        removed: [],
    };

    const docsKeys = Object.keys(docs);
    const modelKeys = Object.keys(model);

    // find the keys recently added
    docsKeys.forEach((key) => {
        if (!modelKeys.includes(key)) {
            currentDiff.added.push(key);
        }
    });

    // find the keys recently removed
    modelKeys.forEach((key) => {
        if (!docsKeys.includes(key)) {
            currentDiff.removed.push(key);
        }
    });

    return currentDiff;
}

export default () => resource({

    id : 'diff',

    load(req, id, callback) {
        callback(null, id);
    },

    read({ diff }, res) {
        const fetcher = new Fetcher();
        fetcher.init(diff, (result, err) => {
            if (result != undefined) {
                const diffResult = getDiff(result[diff]);

                res.status(200);
                res.json(diffResult);
            } else {
                res.status(500);
                res.json({
                    message: 'Error retrieving models/docs key differences',
                    error: err,
                });
            }
        });
    },

    /** GET / - List all entities */
    index(req, res) {
        const fetcher = new Fetcher();
        fetcher.init(null, (result, err) => {
            if (!err) {
                const diff = {};

                Object.keys(result).forEach((name) => {
                    diff[name] = getDiff(result[name]);
                });

                res.status(200);
                res.json(diff);
            } else {
                res.status(500);
                res.json({
                    message: 'Error retrieving models/docs key differences'
                });
            }
        });
    }
});
