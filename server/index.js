const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const HOST = process.env.HOST
const PORT = process.env.PORT
const DB_HOST = process.env.DB_HOST

const Application = require('./http/Application')
const router = require('./http/routes')

const jsonParser = require('./http/middleware/parseJsonMiddleware')
const bodyParser = require('./http/middleware/parseBodyMiddleware')
const parseUrl = require('./http/middleware/parseUrlMiddleware')

const app = new Application()

app.use(jsonParser)
app.use(bodyParser)
app.use(parseUrl(`https://${HOST}:${PORT}`))
app.addRouter(router)

const start = async () => {
    try {
        await mongoose.connect(DB_HOST)
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()