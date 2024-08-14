const toyService = require('../services/toyService');

exports.getToys = (req, res) => {
    const toys = toyService.getToys();
    res.json(toys);
};

exports.createToy = (req, res) => {
    const toy = req.body;
    try{
        const createdToy = toyService.createToy(toy);
        res.status(201).json(createdToy);
    }
    catch(errorMessage) {
        res.status(400).json({error: errorMessage});
    }
};
