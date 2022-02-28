const Router = require('./routers/Router')
const userController = require('./controllers/userController')

const router = new Router()

router.get('/', (request, response) => {
    response.setHeader("Content-Type", "text/html");
    response.write(`<title>Main Page</title>`)
    response.write(`<h1>Welcome to main page</h1>`)
    response.end()
})

router.get('/users', userController.getUsers)

router.post('/users', userController.createUsers)

router.get('/posts', (request, response) => {
    response.send([{title: 'post1'}, {title: 'post2'}])
})

module.exports = router