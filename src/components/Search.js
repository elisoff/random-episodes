import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Search({ onSearch, inputValue }) {
    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(inputValue);
    }, [inputValue]);

    function handleInputChange(event) {
        setValue(event.target.value);
    }

    function isEnterKey(keyCode) {
        const ENTER_KEY_CODE = 13;
        return keyCode === ENTER_KEY_CODE;
    }
    function handleKeyDown(event) {
        if (isEnterKey(event.keyCode)) {
            onSearch(event.target.value);
        }
    }

    function handleSearchClick() {
        onSearch(value);
    }

    return (
        <div className="field has-addons">
            <div className="control is-expanded">
                <input
                    className="input"
                    type="text"
                    placeholder="Search for a TV Show. e.g. Friends"
                    onKeyDown={handleKeyDown}
                    onChange={handleInputChange}
                    value={value}
                />
            </div>
            <div className="control">
                <button
                    type="button"
                    className="button is-info"
                    onClick={handleSearchClick}
                >
                    <span className="icon is-small">
                        <i className="fas fa-search"></i>
                    </span>
                    <span>Search</span>
                </button>
            </div>
        </div>
    );
}

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
};
