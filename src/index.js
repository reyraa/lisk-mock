import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import flash from 'connect-flash';
import api from './api';
import config from './config/general.json';

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
    exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
    limit : config.bodyLimit
}));

// initialize passport
// use connect-flash for flash messages stored in session
app.use(flash());

// api router
app.use('/', api({ config }));

app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started mock server on port ${app.server.address().port}`);
});

export default app;
