const db = require('../../data/db-config');

async function getAll() {
  const result = await db('cars');
  return result;
}

async function getById(id) {
  const result = await db('cars').where('id', id);
  return result[0];
}

async function create(car) {
  const result = await db('cars').insert(car);
  return result;
}

async function getByVin(vin) {
  const result = await db('cars').where('vin', vin);
  return result;
}

module.exports = {
  getAll,
  getById,
  create,
  getByVin
}