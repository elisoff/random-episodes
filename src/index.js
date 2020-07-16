// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics';

// Add the Firebase products that you want to use
import 'firebase/auth';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.scss';

import firebaseConfig from './firebaseconfig.json';

if (process.env.NODE_ENV === 'production') {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
}

ReactDOM.render(<App />, document.getElementById('root'));
