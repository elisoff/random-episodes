import React, { useContext, useReducer, createContext } from 'react';

export const AppContext = createContext();

export function useAppState() {
    return useContext(AppContext)[0];
}

export function useAppStateReducer() {
    return useContext(AppContext)[1];
}

export const CREATE_NOTIFICATION = 'create_notification';
export const REMOVE_NOTIFICATION = 'remove_notification';
export const SET_IS_LOADING = 'set_is_loading';
export const SET_HAS_ERROR = 'set_has_error';

const appStateReducer = (state, action) => {
    switch (action.type) {
        case CREATE_NOTIFICATION:
            return {
                ...state,
                notification: action.notification,
                hasError: action.hasError === true,
            };
        case REMOVE_NOTIFICATION:
            return {
                ...state,
                notification: null,
                hasError: false,
            };
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading };
        case SET_HAS_ERROR:
            return { ...state, hasError: action.hasError };
        default:
            return state;
    }
};

export function AppStateProvider({ children }) {
    const initialState = {
        notification: null,
        isLoading: false,
        hasError: false,
        results: [],
    };

    const value = useReducer(appStateReducer, initialState);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
