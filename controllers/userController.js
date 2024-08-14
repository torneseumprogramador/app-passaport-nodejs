const userService = require('../services/userService');

exports.getUsers = (req, res) => {
    const users = userService.getUsers();
    res.json(users);
};

exports.createUser = (req, res) => {
    const user = req.body;
    const createdUser = userService.createUser(user);
    res.status(201).json(createdUser);
};
