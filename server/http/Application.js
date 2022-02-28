const https = require('https')
const {options} = require('../config')
const EventEmitter = require('events')

module.exports = class Application {
    constructor() {
        this.emitter = new EventEmitter
        this.server = this._createServer()
        this.middlewares = null
    }

    use(middleware) {
        if (!this.middlewares) {
            this.middlewares = {middleware: middleware, next: null}
            return
        }

        let current = this.middlewares
        while (current.next) {
            current = current.next
        }

        current.next = {middleware: middleware, next: null}
    }

    listen(port, callback) {
        this.server.listen(port, callback)
    }

    addRouter(router) {
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path]
            Object.keys(endpoint).forEach(method => {
                const handler = endpoint[method]
                this.emitter.on(`[${path}]:[${method}]`, (request, response) => {
                    handler(request, response)
                })
            })
        })
    }

    _createServer() {
        return https.createServer(options, (request, response) => {
            let node = this.middlewares
            while (node) {
                node.middleware(request, response, () => node = node.next)
            }

            const emitted = this.emitter.emit(this._getRouteMask(request.pathname, request.method), request, response)
            if (!emitted) {
                response.writeHead(404).end('Not Found')
            }
        });
    }

    _getRouteMask(path, method) {
        return `[${path}]:[${method}]`
    }
}