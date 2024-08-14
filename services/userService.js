const userRepository = require('../repositories/userRepository');

exports.getUsers = () => {
    return userRepository.getAll();
};

exports.createUser = (user) => {
    // Aqui você pode adicionar regras de negócio, como validações
    return userRepository.save(user);
};
