const jwtlib = require('jsonwebtoken');
const { AutenticationError } = require('../errors');
const { jwt } = require('../config');

const jwtAuth = async (req, res, next) => {
    try {
        const header = req.get('Autorization');
        if (!header) throw new AutenticationError('No token provided!');
        const token = header.split(' ')[1];
        const decoded = jwtlib.verify(token, jwt.secret, {
            audience: jwt.audience,
            issuer: jwt.issuer

        })

        req.user = decoded;
        next();

    } catch (error) {
        if (error instanceof jwtlib.JsonWebTokenError)
            return next(new AutenticationError('Invalid token!'));
        next(error);

    }

};

module.exports = {
    jwtAuth

};
