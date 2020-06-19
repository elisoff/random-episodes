import React from 'react';
import Header from '../components/common/Header';
import { useLocation } from 'react-router-dom';
import Footer from '../components/common/Footer';
import Notification from '../components/common/Notification';
import { useAppState } from '../hooks/useAppState';

export default function BasePage({ children, classes }) {
    const location = useLocation();
    const { notification } = useAppState();

    return (
        <div className="base-page">
            <Header currentPage={location.pathname} />
            <div
                className={`container is-fluid mt-3 ${classes ? classes : ''}`}
            >
                {notification && (
                    <Notification
                        type={notification.type}
                        isTemporary={notification.isTemporary}
                    >
                        {notification.message}
                    </Notification>
                )}
                {children}
            </div>
            <Footer />
        </div>
    );
}
