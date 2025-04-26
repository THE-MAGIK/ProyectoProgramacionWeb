//Bota el error

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({})
}

module.exports = errorHandler;