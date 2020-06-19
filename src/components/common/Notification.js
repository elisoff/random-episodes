import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    NOTIFICATION_DANGER,
    NOTIFICATION_SUCCESS,
    NOTIFICATION_WARNING,
} from '../../constants';
import { REMOVE_NOTIFICATION, useAppStateReducer } from '../../hooks/useAppState';

export default function Notification({ type, isTemporary, children }) {
    const dispatchAppState = useAppStateReducer();

    useEffect(() => {
        if (isTemporary) {
            setTimeout(
                () => dispatchAppState({ type: REMOVE_NOTIFICATION }),
                5000
            );
        }
    }, [dispatchAppState, isTemporary]);

    function handleCloseNotificationClick() {
        dispatchAppState({ type: REMOVE_NOTIFICATION });
    }

    return (
        <div className={`notification is-${type}`}>
            <button
                className="delete"
                onClick={handleCloseNotificationClick}
            ></button>
            {children}
        </div>
    );
}

Notification.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf([
        NOTIFICATION_DANGER,
        NOTIFICATION_SUCCESS,
        NOTIFICATION_WARNING,
    ]),
    isTemporary: PropTypes.bool,
};

Notification.defaultProps = {
    type: NOTIFICATION_DANGER,
    isTemporary: true,
};
