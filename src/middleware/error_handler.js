const express = require('express');


function errorHandler(err, req, res, next) {
    console.error(err);

    res.status(err.status || 500).send({
        status: "error",
        msg: err.message || "Internal server error"
    });
}

module.exports = errorHandler;
