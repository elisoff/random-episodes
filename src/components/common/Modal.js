import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Modal({ children, textContent, title, onClose }) {
    const [isActiveClass, setIsActiveClass] = useState('');

    useEffect(() => {
        setIsActiveClass('is-active');
    }, []);

    function handleModalClose(event) {
        setIsActiveClass('');
        onClose(event);
    }

    return (
        <div className={`modal ${isActiveClass}`}>
            <div className="modal-background" onClick={handleModalClose}></div>

            <div className="modal-content">
                <div className="box">
                    <p className="mb-3">{title && `Summary - ${title}`}</p>
                    {textContent && (
                        <div
                            className="content is-small"
                            dangerouslySetInnerHTML={{ __html: textContent }}
                        ></div>
                    )}
                    {children}
                </div>
            </div>

            <button
                className="modal-close is-large"
                aria-label="close"
                onClick={handleModalClose}
            ></button>
        </div>
    );
}

Modal.propTypes = {
    textContent: PropTypes.string,
    children: PropTypes.node,
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};
