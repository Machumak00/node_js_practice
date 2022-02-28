const fs = require('fs')

const options = {
    key: fs.readFileSync('./ssl_options/key.pem'),
    cert: fs.readFileSync('./ssl_options/cert.pem')
}

module.exports = {
    options,
}