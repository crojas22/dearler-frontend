const express = require('express');
const config = require('./config');
const bodyParser = require("body-parser");
const compression = require('compression');
const path = require("path");
const serverRenderer = require("./serverRender");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

const router = express.Router();

router.use(express.static(
    path.resolve(__dirname, '..', 'build')
));

router.use('^/$', serverRenderer);
router.use('*', serverRenderer);

app.use(router);


app.listen(config.port, config.host, () => console.info(`Express is listening on port ${config.port}`));



