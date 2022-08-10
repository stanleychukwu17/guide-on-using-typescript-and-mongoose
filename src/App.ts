import express, {Request, Response, NextFunction} from 'express';
import config from 'config'
import log from './logger'
import connect from './db/index'
import routes from './routes';

const port = config.get('port') as number;
const host = config.get('host') as string;

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// setup the port so we can receive request
connect().then(() => {
    app.listen(port, () => {
        log.info(`port listening on http://${host}:${port}`)
    })

    // the routes handler
    routes(app)
})
