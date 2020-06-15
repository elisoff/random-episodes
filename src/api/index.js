export default function API() {
    async function getEpisodesByShowId(showId) {
        if (!showId) {
            throw new Error('showId is required');
        }

        try {
            const response = await fetch(`/api/shows/${showId}/episodes`);

            if (!response.ok) {
                throw new Error('API call failed');
            }

            return response.json();
        } catch (error) {
            throw error;
        }
    }

    async function getShowsByQuery(query) {
        if (!query) {
            throw new Error('q is required');
        }

        try {
            const response = await fetch(`/api/shows/?q=${query}`);

            if (!response.ok) {
                throw new Error('API call failed');
            }

            return response.json();
        } catch (error) {
            throw error;
        }
    }

    return { getEpisodesByShowId, getShowsByQuery };
}
