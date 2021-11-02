const Cars = require('./cars-model');
const vinValidator = require('vin-validator');

async function checkCarId(req, res, next) {
  try {
    const potentialCar = await Cars.getById(req.params.id);
    if (!potentialCar) {
      next({ status: 404, message: `car with id ${req.params.id} is not found` })
    } else {
      req.car = potentialCar;
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function checkCarPayload(req, res, next) {
  const { vin, make, model, mileage } = req.body;
  const error = { status: 400 };
  try {
    if (vin === undefined) {
      error.message = "vin is missing";
    } else if (make === undefined) {
      error.message = "make is missing";
    } else if (model === undefined) {
      error.message = "model is missing";
    } else if (mileage === undefined) {
      error.message = "mileage is missing";
    }
    if (error.message) {
      next(error);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function checkVinNumberValid(req, res, next) {
  try {
    const isValidVin = vinValidator.validate(req.body.vin);
    if (!isValidVin) {
      next({ status: 400, message: `vin ${req.body.vin} is invalid`})
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function checkVinNumberUnique(req, res, next) {
  try {
    const existingVin = await Cars.getByVin(req.body.vin);
    if (existingVin) {
      next({ status: 400, message: `vin ${req.body.vin} already exists`})
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}