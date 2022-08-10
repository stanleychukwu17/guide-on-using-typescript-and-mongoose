import mongoose from "mongoose";
import config from "config"
import log from '../logger/'

async function connect () {
    const dbUri = config.get('dbUri') as string

    return mongoose
        .connect(dbUri)
        .then(re => {
            // log.info('Database connection is okay')
        })
        .catch(err => {
            log.error(err.message)
            process.exit(1)
        })
}

export default connect