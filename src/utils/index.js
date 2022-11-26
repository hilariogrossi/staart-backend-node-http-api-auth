const { pbkdf2Sync, createHash, timingSafeEqual } = require('crypto');
const { encryption } = require('../config');

const wait = (time) =>
  new Promise(resolve =>
    setTimeout(resolve, time)
  )

const encrypt = async (data) =>
  //createHash('sha256').update(data).digest('hex'); Menos seguro que pbkdf2
  pbkdf2Sync(data, encryption.salt, encryption.iterations, encryption.keyLength, encryption.digest).toString('hex');

const safeCompare = async (data, comparison) =>
  timingSafeEqual(Buffer.from(data), Buffer.from(comparison))

module.exports = {
  wait,
  encrypt,
  safeCompare,
}
