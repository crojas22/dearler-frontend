import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import Loadable from 'react-loadable';
import { createStore, applyMiddleware , compose } from 'redux';
import App from './js/components/App';
import registerServiceWorker from './registerServiceWorker';
import './styles/css/index.css';
import reducer from "./js/reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

window.onload = () => {
    Loadable.preloadReady().then(() => {
        ReactDOM.render(
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>,
            document.getElementById('root')
        );
    })
};

registerServiceWorker();
