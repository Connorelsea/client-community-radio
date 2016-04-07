import mysql from "mysql"

const host = "localhost"
const user = "root"
const password = ""
const database = "radio"

const connection = mysql.createConnection({
    host, user, password, database
})


const connect = function() {

    connection.connect(function(err) {

        if (err) {
            console.log(`MySQL: Connection error: ${err}`)
        } else {
            console.log("MySQL: Connected successfully")
        }

    })

}

const getConnection = function () {
    return connection
}

export default {
    connection, connect,  getConnection
}