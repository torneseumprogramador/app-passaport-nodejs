const express = require('express');
const router = express.Router();

let pets = []; // Array para armazenar os animais de estimação

// POST('/'): Inserir um novo animal de estimação
router.post('/', (req, res) => {
  const { name, specie } = req.body;
  pets.push({ name, specie });
  res.send('Pet added');
});

// GET('/:pet'): Trazer o animal de estimação com o nome indicado
router.get('/:pet([A-Za-z\\s]+)', (req, res) => {
  const petName = req.params.pet;
  const pet = pets.find(p => p.name === petName);
  if (pet) {
    res.send(pet);
  } else {
    res.send('Pet not found');
  }
});

// PUT('/:pet'): Adicionar campo "adotado" ao animal de estimação
router.put('/:pet([A-Za-z\\s]+)', (req, res) => {
  const petName = req.params.pet;
  const pet = pets.find(p => p.name === petName);
  if (pet) {
    pet.adopted = true;
    res.send('Pet adopted');
  } else {
    res.send('Pet not found');
  }
});

// Middleware router.param para acessar diretamente o pet
router.param('pet', (req, res, next, petName) => {
  const pet = pets.find(p => p.name === petName);
  if (pet) {
    req.pet = pet;
    next();
  } else {
    res.send('Pet not found');
  }
});

module.exports = router;
