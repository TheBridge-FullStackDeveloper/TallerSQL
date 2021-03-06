katas = {
    "katas": [
        {
            "Name": "Kata 0",
            "Description": "Eliminar la base de datos privada de nombre: '${username}_DeleteMe'",
            "Preparation": "CREATE DATABASE ${username}_Deleteme;",
            "Solution": "DROP DATABASE ${username}_DeleteMe;",
            "Check": "SHOW DATABASE LIKE '${username}_Deleteme';"
        },
        {
            "Name": "Kata 1",
            "Description": "Crea una base de datos privada de nombre: ${username}_Database",
            "Preparation": "",
            "Solution": "CREATE DATABASE ${username}_Database;",
            "Check": "SHOW DATABASE LIKE '${username}_Database';"
        },
        {
            "Name": "Kata 2",
            "Description": "Cree una tabla en la base de datos: ${username}_Database\n   Nombre de la tabla: H_users\n   Campos:\n      name = 'id' type = 'int' PRIMARY KEY\n      name = 'username' type = 'varchar (12)' NOT NULL\n      name = 'password' type = 'varchar (50)' NOT NULL\n   name = 'registrationDate' type = 'Date' NOT NULL",
            "Preparation": "",
            "Solution": "CREATE TABLE ${username}_Database.H_users (\n id int PRIMARY KEY AUTO_INCREMENT,\n username varchar (12) NOT NULL,\n password varchar (50) NOT NULL,\n registrationDate Date NOT NULL\n);",
            "Check": "INSERT INTO ${username}_Database.H_users (username, password, registrationDate) VALUES ('testing', 'testing', '2050-05-04');"
        },
        {
            "Name": "Kata 3",
            "Description": "Inserte 3 usuarios en la tabla: ${username}_Database.H_users",
            "Preparation": "DELETE FROM user0_Database.H_users",
            "Solution": "INSERT INTO ${username}_Database.H_users\n (username, password, registrationDate)\n VALUES\n ('User0', 'PasswordForUser0', '2020-02-03'),\n ('User1', 'PasswordForUser1', '2020-02-03'),\n ('User2', 'PasswordForUser2', '2020-02-03');\n",
            "Check": "SELECT COUNT(id) AS entries FROM user0_Database.H_users;"
        },
        {
            "Name": "Kata 4",
            "Description": "Cambie la contraseña del usuario 'ChangeMyPassword' a 'ASecurePassword123' en la tabla ${username}_Database.H_users",
            "Preparation": "INSERT INTO ${username}_Database.H_users (username, password, registrationDate) VALUE ('ChangeMyPassword', 'ChangeMe', '2020-03-03')",
            "Solution": "UPDATE ${username}_Database.H_users SET `password` = 'ASecurePassword123' WHERE username = 'ChangeMyPass';",
            "Check": "SELECT password FROM ${username}_Database.H_users WHERE username='ChangeMyPass';"
        },
        {
            "Name": "Kata 5",
            "Description": "Elimine al usuario 'DeleteMe' en: ${username}_Database.H_users",
            "Preparation": "INSERT INTO ${username}_Database.H_users (username, password, registrationDate) VALUE ('DeleteMe', 'myPass', '2020-03-03')",
            "Solution": "DELETE FROM ${username}_Database.H_users\n WHERE username = 'ChangeMyPassword';",
            "Check": "SELECT username FROM ${username}_Database.H_users WHERE username = 'DeleteMe'"
        },
        {
            "Name": "Kata 6",
            "Description": "Obtenga todos los usuarios en: exercise_Users.getUsers",
            "Preparation": "CREATE DATABASE exercise_Users;\n CREATE TABLE exercise_Users.getUsers (\n id int PRIMARY KEY AUTO_INCREMENT,\n username varchar(50) NOT NULL,\n password varchar(50) NOT NULL\n);\n INSERT INTO exercise_Users.getUsers (username, password) \n VALUES\n ('David González', 'dkgvkergh456483ufi9fjthg432'),\n ('Alberto Jiménez', 'df8t543ejG*'),\n ('Silvia Fernández', 'wef3rd3ct***XE23122DFRF'),\n ('Andrea Sánchez', 'sFGRFsdsedWDRG24'),\n ('Jorge Pérez', 'dataMolaMazo'),\n ('Carlos Andrés', 'begoMolaTambien'),\n ('The Bridge', '***^ El Mejor Bootcamp De Todos ^***')",
            "Solution": "SELECT * FROM exercise_Users.getUsers;"
        },
        {
            "Name": "Kata 7",
            "Description": "Obtenga los nombres de cada usuario en: exercise_Users.getUsers",
            "Preparation": "",
            "Solution": "SELECT name FROM exercise_Users.getUsers;"
        },
        {
            "Name": "Kata 9",
            "Description": "Inserte en public_colors.fav_color su color favorito (verde, rojo, azul, amarillo) y su nombre",
            "Preparation": "CREATE DATABASE public_colors; CREATE TABLE public_colors.fav_color ( name varchar(50) NOT NULL, color varchar(50) NOT NULL);",
            "Solution": "INSERT INTO public_colors.fav_color\n (name, color)\n VALUES\n ('User', 'color');"
        },
        {
            "Name": "Kata 10",
            "Description": "Cuente a cuantas personas le gusta su color favorito",
            "Preparation": "",
            "Solution": "SELECT COUNT(name)\n FROM public_colors.fav_color\n WHERE color = 'color'"
        }
    ]
}

function func_requestUser() {
    if (window.localStorage.username) {
        document.getElementById('requestUser').className = "hide";
        document.getElementById('loginDetails').className = "";
        let username = window.localStorage.username;
        let password = window.localStorage.password;
        console.log("Username:", username, "Password:", password);
        document.getElementById("loginDetails").insertAdjacentHTML("afterbegin", "<section class='info'><p>Username: <span>" + username + "</span></p><p>Password: <span>" + password + "</span></p></section>")

    }
    else
        fetch("http://" + window.location.hostname + ":8080/requestphpmyadminusername")
            .then((res) => res.json())
            .then(res => {
                if (res.errorCode)
                    console.log(res.errorDescription)
                else {
                    document.getElementById('requestUser').className = "hide";
                    document.getElementById('loginDetails').className = "";
                    window.localStorage.setItem("username", res.username);
                    window.localStorage.setItem("password", res.password);
                    document.getElementById("loginDetails").insertAdjacentHTML("afterbegin", "<section class='info'><p>Username: <span>" + res.username + "</span></p><p>Password: <span>" + res.password + "</span></p></section>")
                    console.log("Username:", res.username, "Password;", res.password);
                }
            })
}

function get_katas()  {
    if (window.localStorage.kata)
        window.localStorage.kata = parseInt(window.localStorage.kata) + 1;
    else
        window.localStorage.kata = 1;
    console.log(katas.katas);
    //katas.katas.map(item => {
        try {
        item = katas.katas[window.localStorage.kata - 1];
        console.log(item.Name);
        console.log(item.Description.replace("${username}", window.localStorage.username));
        }
        catch {
            console.log("no more katas");
        }
    //})
}