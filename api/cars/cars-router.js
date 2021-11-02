const router = require('express').Router();
const Cars = require('./cars-model');

router.get('/', async (req, res, next) => {
    try {
        console.log('GET REQUEST to cars API');
    } catch (err) {
        next(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        console.log('GET REQUEST BY ID to cars API');
    } catch (err) {
        next(err);
    }
})

router.post('/', async (req, res, next) => {
    try {
        console.log('POST REQUEST to cars API');
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
