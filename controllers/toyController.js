const toyService = require('../services/toyService');

exports.getToys = (req, res) => {
    const toys = toyService.getToys();
    res.json(toys);
};

exports.createToy = (req, res) => {
    const toy = req.body;
    const createdToy = toyService.createToy(toy);
    res.status(201).json(createdToy);
};
