import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import App from "../src/js/components/App";
import reducer from "../src/js/reducers";

const path = require("path");
const fs = require("fs");

module.exports =  (req, res, next) => {
    const filePath = path.resolve(__dirname, "..", "build", "index.html");
    fs.readFile(filePath, "utf8", (err, htmlData) => {
        if (err) {
            console.error('err', err);
            return res.status(404).end()
        }
        let context = {};
        const store = createStore(reducer, applyMiddleware(thunk));

        const html = renderToString(
            <StaticRouter location={req.url} context={context}>
                <Provider store={store}>
                    <App/>
                </Provider>
            </StaticRouter>
        );

        return res.send(
            htmlData.replace(
                '<div id="root"></div>',
                `<div id="root">${html}</div>`
            )
        );
    });
};