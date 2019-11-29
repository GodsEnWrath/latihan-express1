const {
    PORT, DATABASE_HOST,
    DATABASE_PASSWORD,
    DATABASE_NAME
} = require("./envroinment")


const { connect, get, close } = require("./connections")

module.exports = {
    PORT: PORT,
    DATABASE_HOST: DATABASE_HOST,
    DATABASE_PASSWORD: DATABASE_PASSWORD,
    DATABASE_NAME: DATABASE_NAME,
    connect: connect,
    get: get,
    close: close
}