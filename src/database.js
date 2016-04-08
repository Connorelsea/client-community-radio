import mysql from "mysql"

const host = "localhost"
const user = "root"
const password = ""
const database = "radio"

const connection = mysql.createConnection({
    host, user, password, database
})

const connect = function() {

    return new Promise(function(resolve, reject) {

        connection.connect(function(err) {

            if (err) {
                console.log(`MySQL: Connection error: ${err}`)

                reject({
                    success: false,
                    msg: err
                })

            } else {
                console.log("MySQL: Connected successfully")

                resolve({
                    success: true,
                    msg: "Connected successfully"
                })
                
            }

        })

    })

}

const getConnection = function () {
    return connection
}

export default {
    connection, connect,  getConnection
}