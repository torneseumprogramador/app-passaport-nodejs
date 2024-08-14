const { users } = require('../data');

exports.getAll = () => {
    return users;
};

exports.save = (user) => {
    users.push(user);
    return user;
};
