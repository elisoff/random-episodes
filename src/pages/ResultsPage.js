import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ProgressBar from '../components/common/ProgressBar';
import ShowsList from '../components/ShowsList';
import Search from '../components/Search';
import useSearch from '../hooks/useSearch';

export default function ResultsPage() {
    const history = useHistory();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [initializeSearch, isLoading, shows] = useSearch();

    useEffect(() => {
        const searchQueryParam = getSearchQueryParam(location);

        if (!searchQueryParam) {
            history.push('/');
        } else {
            setSearchQuery(searchQueryParam);
        }
    }, [history, location]);

    useEffect(() => {
        initializeSearch(searchQuery);
    }, [initializeSearch, searchQuery]);

    function getSearchQueryParam(location) {
        const urlParams = new URLSearchParams(location.search);

        return urlParams.get('q') || false;
    }

    function handleOnSearch(query) {
        if (query) {
            history.push(`/results?q=${query}`);
        }
    }
    return (
        <>
            <Header currentPage="/results" />
            <div className="container mt-3">
                <div className="columns is-centered">
                    <div className="column is-half">
                        <Search
                            onSearch={handleOnSearch}
                            inputValue={searchQuery}
                        />
                    </div>
                </div>
                <ProgressBar hidden={!isLoading} />
                {!isLoading && shows.length === 0 && (
                    <h2 className="is-size-4 mb-3">
                        No results found for "{searchQuery}"
                    </h2>
                )}
                {!isLoading && shows.length > 0 && (
                    <h2 className="is-size-4 mb-3">
                        Results for "{searchQuery}"
                    </h2>
                )}
                {!isLoading && shows.length > 0 && <ShowsList list={shows} />}
            </div>
            <Footer />
        </>
    );
}
