const constants = require('./constants');
const makeGetHttpRequest = require('./utils');

function Shows() {
    function getShowsByQuery(query) {
        const urlParams = new URLSearchParams(query);
        const q = urlParams.get('q');

        if (!q) {
            const promise = new Promise((resolve, reject) =>
                reject({ status: 400, message: 'Missing q parameter' })
            );
            return promise;
        }

        const options = {
            host: constants.TV_MAZE_API_HOST,
            path: encodeURI(`/search/shows?q=${q}`),
        };

        return makeGetHttpRequest(options);
    }

    return { getShowsByQuery };
}

module.exports = Shows;
