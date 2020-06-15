const constants = require('./constants');
const makeGetHttpRequest = require('./utils');

function Episodes() {
    function getEpisodesByShowId(params) {
        const { showId } = params;

        if (!showId) {
            const promise = new Promise((resolve, reject) =>
                reject({ status: 400, message: 'Missing show ID parameter' })
            );
            return promise;
        }

        const options = {
            host: constants.TV_MAZE_API_HOST,
            path: `/shows/${showId}/episodes`,
        };

        return makeGetHttpRequest(options);
    }

    return { getEpisodesByShowId };
}

module.exports = Episodes;
