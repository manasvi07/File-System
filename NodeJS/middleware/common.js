const helmet = require('helmet');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.use(helmet());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
}