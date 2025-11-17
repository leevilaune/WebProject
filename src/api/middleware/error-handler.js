const notFoundHandler = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;
    next(error);
};

const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);

    res.json({
        error: {
            error: err.message,
            status: err.status || 500,
        },
    });
};

export { notFoundHandler, errorHandler };
