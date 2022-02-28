const User = require('../../db/models/userModel')

class UserController {
    async createUsers(request, response) {
        let user = await User.create(request.body)
        response.send(user)
    }

    async getUsers(request, response) {
        const {id} = request.params
        let users
        if (id) {
            users = await User.findById(id)
        } else {
            users = await User.find()
        }
        response.send(users)
    }
}

module.exports = new UserController()