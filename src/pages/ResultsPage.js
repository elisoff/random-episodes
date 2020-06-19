import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import BasePage from './BasePage';
import ProgressBar from '../components/common/ProgressBar';
import ShowsList from '../components/ShowsList';
import Search from '../components/Search';

import API from '../api';

import { DEFAULT_ERROR_MESSAGE } from '../constants';

import { useAppState } from '../hooks/useAppState';
import useRequestState from '../hooks/useRequestState';

export default function ResultsPage() {
    const history = useHistory();
    const location = useLocation();
    const { isLoading, hasError } = useAppState();

    const [searchQuery, setSearchQuery] = useState('');
    const [shows, setShows] = useState([]);

    const { setIsLoading, createErrorNotification } = useRequestState();

    useEffect(() => {
        const searchQueryParam = getSearchQueryParam(location);

        if (!searchQueryParam) {
            history.push('/');
        } else {
            setSearchQuery(searchQueryParam);
        }
    }, [history, location]);

    useEffect(() => {
        if (searchQuery) {
            const { getShowsByQuery } = API();

            setIsLoading(true);

            getShowsByQuery(searchQuery)
                .then((results) => {
                    setShows(results);
                })
                .catch(() => {
                    createErrorNotification(DEFAULT_ERROR_MESSAGE, false);
                })
                .finally(() => setIsLoading(false));
        }
    }, [createErrorNotification, searchQuery, setIsLoading]);

    function getSearchQueryParam(location) {
        const urlParams = new URLSearchParams(location.search);

        return urlParams.get('q') || false;
    }

    function handleOnSearch(query) {
        if (query) {
            history.push(`/results?q=${query}`);
        }
    }

    function hasResults() {
        return !isLoading && shows.length > 0;
    }

    return (
        <>
            <BasePage>
                <div className="columns is-centered">
                    <div className="column is-half">
                        <Search
                            onSearch={handleOnSearch}
                            inputValue={searchQuery}
                        />
                    </div>
                </div>
                <ProgressBar hidden={!isLoading || hasError} />
                {!hasResults() && !hasError && (
                    <h2 className="is-size-4 mb-3">
                        No results found for "{searchQuery}"
                    </h2>
                )}
                {hasResults() && !hasError && (
                    <h2 className="is-size-4 mb-3">
                        Results for "{searchQuery}"
                    </h2>
                )}
                {!isLoading && shows.length > 0 && <ShowsList list={shows} />}
            </BasePage>
        </>
    );
}
