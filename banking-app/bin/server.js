let express = require('express');
import config from '../config';

let accountRouter = require('../src/modules/account/router/accounts');

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/account', accountRouter);

app.listen(config.port, () => console.log(`Bank-app server listening on ${config.port}`));
module.exports = app;

