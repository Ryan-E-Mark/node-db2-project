const db = require('../../data/db-config');

async function getAll () {
  const result = await db('cars');
  return result;
}

async function getById(id) {
  const result = await db('cars').where('id', id);
  return result;
}

async function create(car) {
  const result = await db('cars').insert(car);
  return result;
}

module.exports = {
  getAll,
  getById,
  create
}