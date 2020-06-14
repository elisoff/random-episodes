import React from 'react';
import PropTypes from 'prop-types';

export default function ProgressBar({ hidden }) {
    return (
        <>
            {!hidden && (
                <progress className="progress is-small is-info mt-2" max="100">
                    Loading...
                </progress>
            )}
        </>
    );
}

ProgressBar.propTypes = {
    hidden: PropTypes.bool.isRequired,
};
