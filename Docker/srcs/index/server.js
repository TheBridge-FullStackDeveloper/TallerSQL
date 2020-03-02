/*
**  CREATE USER 'User_Name'@'%' IDENTIFIED VIA mysql_native_password USING '***';GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, FILE, INDEX, ALTER, CREATE TEMPORARY TABLES, CREATE VIEW, EVENT, TRIGGER, SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, EXECUTE ON *.* TO 'User_Name'@'%' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;CREATE DATABASE IF NOT EXISTS `User_Name`;GRANT ALL PRIVILEGES ON `User\_Name`.* TO 'User_Name'@'%'; 
*/



var express = require("express");
var https = require("http");
var mysql = require("mysql");
var crypto = require("crypto");
var cors = require("cors");
var password_generator = require("password-generator");

var server = express();
server.use(cors());
const ServerPort = 8080;
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'IAmTheAdminBitch*',
    multipleStatements: true
})

database.connect(err => {
    if (err)
        console.log(err);
});

server.get("/", (req, res) => {
    res.send("Holi");
})
server.use(express.static(__dirname + "/html"));
server.get("/ip", (req, res) => {
    let ip = req.header('x-forwarded-for') || req.connection.remoteAddress; 
    res.send("Your ip is: " + ip);
})
server.get("/requestphpmyadminusername", (req, res) => {
    /*let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    database.query("SELECT username, password FROM users.users WHERE ip='" + ip + "'", (error, row) => {
        if (!error && row.length > 0) {
            let username = row[0].username.toString("utf-8");
            let password = row[0].password.toString("utf-8");
            res.send({ "username": username, "password": username });
        }
        else {*/
            database.query('SELECT CONCAT("user", count(username)) AS username FROM users.users', (error, row) => {
                if (error) {
                    console.log(error);
                    res.send({ errorCode: "0", errorDescription: "Username can not be retrieved" });
                }
                else {
                    let username = row[0].username.toString("utf-8");
                    let password = password_generator(5);
                    //let password = row[0].username.toString("utf-8");
                    database.query("INSERT INTO users.users (username, password"/*, ip*/ + ") VALUES ('" + username + "', '" + password + "'"/*, '" + ip + "'*/ + ")", (error) => {
                        if (error) {
                            console.log(error);
                            res.send({ errorCode: "1", errorDescription: "User can not be created" });
                        }
                        else {
                            //TODO create real user
                            database.query("CREATE USER '" + username + "'@'%' IDENTIFIED BY '" + password + "'; GRANT ALL PRIVILEGES ON `public\_%`.* TO '" + username + "'@'%'; GRANT ALL PRIVILEGES ON `" + username + "\_%`.* TO '" + username + "'@'%'; GRANT SELECT ON `exercise\_%`.* TO '" + username +"'@'%';", (error) => {
                                if (error)
                                {
                                    console.log(error);
                                    res.send({ errorCode: "2", errorDescription: "Real User can not be created" });
                                }
                                else
                                    res.send({ "username": username, "password": password });
                            });
                        }
                    });
                }
            })

        //}
    //})

})

https.createServer(server).listen(ServerPort);