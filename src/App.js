import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ResultsPage from './pages/ResultsPage';
import HomePage from './pages/HomePage';

export default function App() {
    return (
        <>
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
        </>
    );
}
