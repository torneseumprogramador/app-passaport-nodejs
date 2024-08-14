const toyRepository = require('../repositories/toyRepository');

exports.getToys = () => {
    return toyRepository.getAll();
};

exports.createToy = (toy) => {
    // Aqui você pode adicionar regras de negócio, como validações
    return toyRepository.save(toy);
};
