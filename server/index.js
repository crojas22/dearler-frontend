const express = require('express');
const config = require('./config');
const bodyParser = require("body-parser");
const path = require("path");
const universal = require("./universal");
const index = require("./routes/index");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", index);

app.use(express.static(path.resolve(__dirname, "..", "public")));

app.use("/", universal);


app.listen(config.port, config.host, () => console.info(`Express is listening on port ${config.port}`));



