import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ResultsPage from './pages/ResultsPage';
import HomePage from './pages/HomePage';
import { AppStateProvider } from './hooks/useAppState';

export default function App() {
    return (
        <AppStateProvider>
            <BrowserRouter>
                <Switch>
                    <Route path="/results">
                        <ResultsPage />
                    </Route>
                    <Route path="/">
                        <HomePage />
                    </Route>
                </Switch>
            </BrowserRouter>
        </AppStateProvider>
    );
}
