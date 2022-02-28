module.exports = (basedUrl) => (request, response, next) => {
    const parsedUrl = new URL(request.url, basedUrl)
    let params = {}
    parsedUrl.searchParams.forEach((value, key) => params[key] = value)

    request.pathname = parsedUrl.pathname
    request.params = params

    next()
}