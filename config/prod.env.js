var secrets = require('./secrets')

module.exports = {
  NODE_ENV: '"production"',
  FIREBASE: secrets.firebase,
}
