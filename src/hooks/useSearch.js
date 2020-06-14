import { useState, useEffect } from 'react';
import API from '../api';

export default function useSearch() {
    const [results, setResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const { getShowsByQuery } = API();

            setIsLoading(true);

            try {
                const shows = await getShowsByQuery(searchQuery);

                setIsLoading(false);

                if (!shows) {
                    throw new Error('Something went wrong fetching episodes');
                }

                setResults(shows);
            } catch (error) {
                console.log(error, 'handle error');
            }

            // try {
            //     const episodes = await getEpisodesByShowId(showId);

            //     if (!episodes || episodes.length === 0) {
            //         throw new Error('Something went wrong fetching episodes');
            //     }

            //     setResults(episodes);
            // } catch (error) {
            //     console.log(error, 'handle error');
            // }
        }

        if (searchQuery) {
            fetchData();
        }
    }, [searchQuery]);

    function initializeSearch(query) {
        setSearchQuery(query);
    }

    return [initializeSearch, isLoading, results];
}
