const { AuthenticationError, NotFoundError } = require('../errors');
const { getByLogin } = require('../users/repository/sql-repository');
const { encrypt, safeCompare } = require('../utils');

const decryptHeader = async (authorizationHeader) => {
    if (!authorizationHeader) throw new AuthenticationError(null, 'Header not Found!');

    const [type, credentials] = authorizationHeader.split(' ');
    if (type !== 'Basic') throw new AuthenticationError(null, 'Head type mismatch');

    const decryptedCredentials =
        Buffer.from(credentials, 'base64').toString('utf-8');

    const [username, plainPassword] = decryptedCredentials.split(':');

    return {
        username,
        plainPassword,
    };
};

const basicAuth = repository =>
    async (req, _res, next) => {
        try {
            const basicHeader = req.get('Authorization');
            const { username, plainPassword } = await decryptHeader(basicHeader);

            if (!username || !plainPassword) throw new AuthenticationError(null, 'Missing data');

            const user = await repository.getByLogin(username);

            const isValid = await safeCompare(await encrypt(plainPassword), user.password);

            if (!isValid) throw new AuthenticationError(username, 'Invalid Credentials');

            req.user = user;
            next();

        } catch (error) {
            if (error instanceof NotFoundError)
                return next(new AuthenticationError(error.resourceId, 'Username not Found!'));
            next(error);
        };
    };

module.exports = { basicAuth };
