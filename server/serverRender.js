import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import App from "../src/js/components/App";
import reducer from "../src/js/reducers";
import Loadable from 'react-loadable';
import manifest from "../build/asset-manifest.json";

const path = require("path");
const fs = require("fs");

const extractAssets = (assets, chunks) => Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k]);

module.exports =  (req, res, next) => {
    const filePath = path.resolve(__dirname, "..", "build", "index.html");
    fs.readFile(filePath, "utf8", (err, htmlData) => {
        if (err) {
            console.error('err', err);
            return res.status(404).end()
        }
        const modules = [],
            context = {},
            store = createStore(reducer, applyMiddleware(thunk));

        const html = renderToString(
            <Loadable.Capture report={m => modules.push(m)}>
                <StaticRouter location={req.url} context={context}>
                    <Provider store={store}>
                        <App/>
                    </Provider>
                </StaticRouter>
            </Loadable.Capture>
        );

        const extraChunks = extractAssets(manifest, modules)
            .map(c => `<script type="text/javascript" src="/${c}"></script>`);

        return res.send(
            htmlData
                .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
                .replace('</body>', extraChunks.join('') + '</body>')
        );
    });
};