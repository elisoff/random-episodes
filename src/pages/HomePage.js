import React from 'react';

import { useHistory } from 'react-router-dom';
import Search from '../components/Search';
import BasePage from './BasePage';

export default function HomePage() {
    const history = useHistory();

    function handleOnSearch(searchQuery) {
        if (searchQuery) {
            history.push(`/results?q=${searchQuery}`);
        }
    }

    return (
        <>
            <BasePage containerClassName="home-page">
                <div className="columns is-centered is-vcentered is-mobile">
                    <div className="column is-half-desktop">
                        <h3 className="title">TV Shows Search</h3>
                        <Search onSearch={handleOnSearch} inputValue="" />
                    </div>
                </div>
            </BasePage>
        </>
    );
}
