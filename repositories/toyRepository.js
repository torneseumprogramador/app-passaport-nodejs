const { toys } = require('../data');

exports.getAll = () => {
    return toys;
};

exports.save = (toy) => {
    toys.push(toy);
    return toy;
};
