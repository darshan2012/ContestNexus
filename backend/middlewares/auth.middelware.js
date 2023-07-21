// middlewares/auth.js

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRETKEY);
        next();
    } catch (error) {
        console.log("here");
        res.status(401).json({ message: "Authentication failed!" });
    }
};