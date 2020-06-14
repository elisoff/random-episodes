import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Header({ currentPage }) {
    function getActiveClassIfActive(page) {
        return currentPage === page ? 'is-active' : '';
    }

    function isResultsPage() {
        return currentPage === '/results';
    }

    return (
        <nav
            className="navbar is-fixed-top custom-navbar has-background-light"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="navbar-brand custom-navbar ml-3">
                <h3 className="is-size-4">Random episodes</h3>
            </div>

            <nav className="breadcrumb ml-5" aria-label="breadcrumbs">
                <ul>
                    <li className={getActiveClassIfActive('/')}>
                        <Link to="/">Home</Link>
                    </li>
                    {isResultsPage() && (
                        <li className={getActiveClassIfActive('/results')}>
                            <Link to="/results">Results</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </nav>
    );
}

Header.propTypes = {
    currentPage: PropTypes.oneOf(['/', '/results']),
};
