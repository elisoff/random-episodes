import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import ShowsList from '../components/ShowsList';
import API from '../api';
import { useHistory } from 'react-router-dom';

export default function ResultsPage() {
    const history = useHistory();
    const { getShowsByQuery } = API();
    const [shows, setShows] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const searchQueryParam = getSearchQueryParam(history.location)

        if (!searchQueryParam) {
            history.push('/');
        } else {
            setQuery(searchQueryParam);

            async function fetchData() {
                try {
                    const fetchedShows = await getShowsByQuery();

                    setShows(fetchedShows);
                } catch (error) {
                    console.log('handle error', error);
                }
            }

            fetchData();
        }
    }, [history, getShowsByQuery]);

    function getSearchQueryParam(location) {
        const urlParams = new URLSearchParams(location.search);

        return urlParams.get('q') || false;
    }

    return (
        <>
            <Breadcrumb currentPage="/results" />
            <div className="container">
                <h2 className="is-size-4 mb-3">Results for "{query}"</h2>
                <ShowsList list={shows} />
            </div>
        </>
    );
}
