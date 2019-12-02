const {DATABASE_HOST, DATABASE_NAME} = require("./envroinment")

const MongoClient = require("mongodb").MongoClient;

let mongo;

const connect = callback => {
    MongoClient.connect(
       DATABASE_HOST,
        { useNewUrlParser: true, useUnifiedTopology: true},
        function(e, client) {
            if (e) {
                console.log(e)
                throw{ ERROR: "Databases Connection is failed"}
            }
            console.log("Connected to database")

            mongo = client
            callback()
        }
    )
}

const get = () => {
    return mongo.db(DATABASE_NAME)
}

const close = () => {
    mongo.close
}

module.exports = {
    connect, 
    get, 
    close
}