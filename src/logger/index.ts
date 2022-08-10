import logger from 'pino'
import dayjs from 'dayjs'

const args = {
    pettyPrint: true,
    base: {pid: false},
    timestamp: () => `, "time":"${dayjs().format()}"`
}
const log = logger(args)
export default log