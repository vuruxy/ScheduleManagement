const express = require('express')
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const homeController = require('./controllers/home');
const config = require('./config.json');

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    extname: 'hbs',
    defaultLayout: 'main',
    helpers: {
        url: () => {
            return 'http://' + config.host + ':' + config.port;
        },
        title: () => {
            return config.title;
        }
    }
}));

app.use(session({secret: 'test'}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/views/public'));

app.use('/', homeController);
app.use('/home', homeController);

app.listen(config.port, () => {
    console.log('Applicaton Start');
});