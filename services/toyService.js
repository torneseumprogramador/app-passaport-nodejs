const toyRepository = require('../repositories/toyRepository');

exports.getToys = () => {
    return toyRepository.getAll();
};

exports.createToy = (toy) => {
    if(!toy.name) throw "The name is required"

    return toyRepository.save(toy);
};
