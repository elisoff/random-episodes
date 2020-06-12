import React from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <>
            <Breadcrumb currentPage="/" />
            <div className="container">

                <Link to="/results">CLICK HERE</Link>
            </div>

            {/*<div className="container">
            <button
                type="button"
                className="button is-primary"
                onClick={handleRandomEpClick}
            >
                Random episode
            </button>

            { <div className="panel">
        <div className="panel-block">
            {Object.keys(randomEpisode).length !== 0 && (
                <span>
                    {randomEpisode.name} - {randomEpisode.season}x
                    {randomEpisode.number}
                </span>
            )}
        </div>
    </div> 
            
        </div>*/}
        </>
    );
}
