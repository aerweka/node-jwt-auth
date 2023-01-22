const jwt = require("jsonwebtoken");

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_JWT, {
        expiresIn: parseInt(process.env.MAXAGE_JWT, 10),
    });
};

module.exports = { createToken }