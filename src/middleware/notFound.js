const express = require('express');


const notFound = (req, res, next) => {
    res.status(404).send({
        status: "error",
        msg: `Route ${req.originalUrl} not found`
    });
};

module.exports = notFound;