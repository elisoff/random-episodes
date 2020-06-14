import React from 'react';
import Header from '../components/common/Header';
import { useHistory } from 'react-router-dom';
import Search from '../components/Search';
import Footer from '../components/common/Footer';

export default function HomePage() {
    const history = useHistory();

    function handleOnSearch(searchQuery) {
        if (searchQuery) {
            history.push(`/results?q=${searchQuery}`);
        }
    }

    return (
        <>
            <Header currentPage="/" />
            <div className="container home-page">
                <div className="columns is-centered is-vcentered">
                    <div className="column is-6">
                        <h3 className="title">TV Shows Search</h3>
                        <Search onSearch={handleOnSearch} inputValue="" />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
