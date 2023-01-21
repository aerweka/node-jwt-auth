const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
    console.log(err);
    let errors = {
        email: "",
        password: "",
    };

    if (err.message === "unregistered email") {
        errors.email = "Tha email is not registered";
    }
    if (err.message === "incorrect password") {
        errors.password = "Tha password is incorrect";
    }

    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    if (err.code === 11000) {
        errors["email"] = "Email is already registered";
        return errors;
    }

    return errors;
};

const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = await User.create({ email, password });
        const token = createToken(newUser._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
        });
        return res.status(201).json({ user: newUser._id });
    } catch (error) {
        const errors = handleErrors(error);
        return res.status(400).json({ errors });
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
        });
        return res.status(200).json({ user: user._id });
    } catch (error) {
        const errors = handleErrors(error);
        return res.status(400).json({ errors });
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_JWT, {
        expiresIn: maxAge,
    });
};

module.exports = { signup, signin }