const path = require("path");
const fs = require("fs");

const React = require("react");
const {StaticRouter} = require("react-router-dom");
const {renderToString} = require("react-dom/server");
const {Provider} = require('react-redux');
const {createStore} = require("redux");
const reducer = require("../src/js/reducers");

const {applyMiddleware} = require("redux");
const thunk = require("redux-thunk");

const {default: App} = require("../src/js/components/App");


module.exports = function universal(req, res) {
    const filePath = path.resolve(__dirname, "..", "public", "index.html");
    fs.readFile(filePath, "utf8", (err, html) => {
        if (err) {
            return res.status(404).end();
        }
        const context = {};
        const store = createStore( applyMiddleware(thunk));
        const markup = renderToString(
            <StaticRouter location={req.url} context={context}>
                <Provider store={store}>
                    <App />
                </Provider>
            </StaticRouter>
        );
        if (context.url) {
            res.redirect(301, context.url);
        } else {
            res.send(html.replace("{{SSR}}", markup));
        }
    })
};
