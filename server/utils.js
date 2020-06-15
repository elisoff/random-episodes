const http = require('http');

function makeGetHttpRequest(options) {
    const promise = new Promise((resolve, reject) => {
        http.request(options, (response) => {
            let rawData = '';

            response.on('data', function (chunk) {
                rawData += chunk;
            });

            response.on('end', function () {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                } catch (e) {
                    reject(e);
                }
            });
        })
            .on('error', (e) => {
                reject(e);
            })
            .end();
    });

    return promise;
}

module.exports = makeGetHttpRequest;
