const router = require('express').Router();
const Cars = require('./cars-model');
const { checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
} = require('./cars-middleware');

router.get('/', async (req, res, next) => {
    try {
        const cars = await Cars.getAll();
        if (!cars) {
            res.send([]);
        } else {
            res.status(200).json(cars);
        }
    } catch (err) {
        next(err);
    }
})

router.get('/:id', checkCarId, async (req, res, next) => {
    try {
        res.status(200).json(req.car);
    } catch (err) {
        next(err);
    }
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    try {
        const newCarId = await Cars.create(req.body);
        const newCar = await Cars.getById(newCarId);
        res.status(201).json(newCar);
    } catch (err) {
        next(err);
    }
})

router.use((err, req, res, next) => {
    res.status( err.status || 500).json({
        message: err.message,
        prodMessage: "Something went terribly wrong"
    })
})

module.exports = router;
