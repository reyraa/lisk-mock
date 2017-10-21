import request from 'request';

class Fetcher {
    constructor () {
        this.baseUrl = 'https://virtserver.swaggerhub.com/Isabello/Lisk/1.0.0';
        this.models = {
            account: {
                reference: '/accounts?publicKey=12668885769632475474L',
                name: 'account',
                params: [0],
            },
            transaction: {
                reference: '/transactions?publicKey=12668885769632475474L',
                name: 'transaction',
                params: [0],
            },
        };
    }

    fetchReference (model) {
        const promise = new Promise((resolve, reject) => {
            request.get({
                url: `${this.baseUrl}${model.reference}`,
                json: true,
            }, (err, { body, statusCode }) => {
                if (statusCode === 200) {
                    const docs = body instanceof Array ? body[0] : body;
                    return resolve(docs);
                }
                return reject({
                    message: `Error retrieving ${model.name} docs`,
                    info: err,
                });
            });
        });

        return promise;
    }

    fetchModel (model) {
        const promise = new Promise((resolve, reject) => {
            try {
                const mockModel = require(`../models/${model.name}`);
                resolve(mockModel.default(...model.params));
            } catch (e) {
                reject({ 
                    message: `Couldn\'t instantiate the ${model.name} model`,
                    info: e,
                });
            }
        });

        return promise;
    }

    init (name, cb) {
        if (name && !Object.keys(this.models).includes(name)) {
            return cb(null, 'No such a model');
        }

        const promises = [];
        const models = name !== null ? [name] : Object.keys(this.models);

        models.forEach((model) => {
            promises.push(this.fetchModel(this.models[model]));
            promises.push(this.fetchReference(this.models[model]));
        });

        Promise.all(promises)
        .then((values) => {
            const result = {};
            for (let i = 0; i < models.length; i++) {
                result[models[i]] = [
                    values[2 * i],
                    values[2 * i + 1],
                ];
            }
            cb(result);
        }).catch((err) => {
            console.log('Cought', err);
            cb(null, err)
        });
    }
}

export default Fetcher;
