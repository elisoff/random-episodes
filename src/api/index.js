import EpisodesData from './mockepisodesdata.json';
import ShowsList from './mockshowslist.json';

export default function API() {
    function getEpisodesByShowId(showId) {
        const promise = new Promise((resolve) =>
            setTimeout(() => resolve(EpisodesData), 300)
        );

        return promise;
    }

    function getShowsByQuery(query) {
        const promise = new Promise((resolve) =>
            setTimeout(() => resolve(ShowsList), 300)
        );

        return promise;
    }

    return { getEpisodesByShowId, getShowsByQuery };
}
