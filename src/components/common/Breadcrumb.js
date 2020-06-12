import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ currentPage }) {
    function getActiveClassIfActive(page) {
        return currentPage === page ? 'is-active' : '';
    }

    function isResultsPage() {
        return currentPage === '/results';
    }

    return (
        <div className="box">
            <nav className="breadcrumb" aria-label="breadcrumbs">
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
        </div>
    );
}
