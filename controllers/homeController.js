const userService = require('../services/userService');

exports.index = (req, res) => {
    const users = userService.getUsers();
    res.render("home/index", {users: users});
};
