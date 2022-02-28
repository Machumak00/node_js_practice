module.exports = (request, response, next) => {
    response.send = data => {
        response.writeHead(200, {
            'Content-type': 'application/json'
        })
        response.end(JSON.stringify(data))
    }
    next()
}