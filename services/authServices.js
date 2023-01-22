const db = require("../models");
const User = db.user
const Op = db.Sequelize.Op
const { createToken } = require("../utils/jwtUtils")
const response = require("../utils/responseTemplate");
const bcrypt = require("bcrypt");
require("dotenv").config();

const signup = async (req, res) => {
    const { email, password } = req.body;

    if (!email) return res.status(400).send(response(null, "Please insert the email", 400))

    if (!password) return res.status(400).send(response(null, "Please insert the password", 400))

    await User.findOne({ where: { email: email } })
        .then(data => {
            if (data) return res.status(201).send(response(null, "Email already registered", 201))
        })

    await User.create(req.body)
        .then(data => {
            const token = createToken(data.id);
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: parseInt(process.env.MAXAGE_JWT, 10) * 1000,
            });
            res.status(201).send(response({ token: token }, "User signed up successfully", 201))
        })
        .catch(err => {
            res.status(500).send(response(null, err.message || "Some error occurred while signing up", 500))
        })
}

const signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email) return res.status(400).send(response(null, "Please insert the email", 400))

    if (!password) return res.status(400).send(response(null, "Please insert the password", 400))

    User.findOne({ where: { email } })
        .then(data => {
            if (data) {
                const auth = bcrypt.compare(password, data.password);
                if (auth) {
                    const token = createToken(data.id);
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: parseInt(process.env.MAXAGE_JWT, 10) * 1000,
                    });
                    res.status(200).send(response({ token: token }, "User signed in successfully", 200))
                }
            } else {
                res.status(404).send(response(null, "Unregistered email, please sign up!", 404))
            }
        })
        .catch(err => {
            res.status(500).send(response(null, err.message || "Some error occurred while creating book", 500))
        })
}



module.exports = { signup, signin }