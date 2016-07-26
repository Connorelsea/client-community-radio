import mysql from "mysql"

const host = process.env.DATABASE_URL || "localhost"
const user = process.env.DATABASE_USERNAME || "root"
const password = process.env.DATABASE_PASSWORD || ""
const database = process.env.DATABASE_NAME || "radio"

let connection

export const createConnection = function() {
	connection = mysql.createConnection({
		host, user, password, database
	})
}

export const getConnection = function() {
	return connection
}

export const connect = function() {

	return new Promise(function(resolve, reject) {

		createConnection()

		getConnection().connect(function(err) {

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

export default {
	createConnection, getConnection, connect
}
