import { useMemo } from 'react';
import {
    CREATE_NOTIFICATION,
    REMOVE_NOTIFICATION,
    useAppStateReducer,
    SET_IS_LOADING,
} from './useAppState';
import { NOTIFICATION_DANGER, NOTIFICATION_SUCCESS } from '../constants';

export default function useRequestState() {
    const dispatchAppState = useAppStateReducer();

    return useMemo(() => {
        function setIsLoading(isLoading) {
            dispatchAppState({
                type: SET_IS_LOADING,
                isLoading,
            });
        }

        function createErrorNotification(message, isTemporary) {
            dispatchAppState({
                type: CREATE_NOTIFICATION,
                notification: {
                    type: NOTIFICATION_DANGER,
                    message,
                    isTemporary,
                },
                hasError: true,
            });
        }

        function createSuccessNotification(message, isTemporary) {
            dispatchAppState({
                type: CREATE_NOTIFICATION,
                notification: {
                    type: NOTIFICATION_SUCCESS,
                    message,
                    isTemporary,
                },
            });
        }

        function removeNotification() {
            dispatchAppState({
                type: REMOVE_NOTIFICATION,
                hasError: false,
            });
        }

        return {
            removeNotification,
            createErrorNotification,
            createSuccessNotification,
            setIsLoading,
        };
    }, [dispatchAppState]);
}
