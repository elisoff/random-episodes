import EpisodesData from './mockepisodesdata.json';
import ShowsList from './mockshowslist.json';

export default function API() {
    function getEpisodesByShowId(showId) {
        const promise = new Promise((resolve) => resolve(EpisodesData));
        return promise;
    }

    function getShowsByQuery() {
        const promise = new Promise((resolve) => resolve(ShowsList));

        return promise;
    }

    return { getEpisodesByShowId, getShowsByQuery };
}
