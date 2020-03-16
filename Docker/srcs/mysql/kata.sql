-- Kata 0 - Eliminar la base de datos privada de nombre: username_DeleteMe
    -- Solution:
        DROP DATABASE username_DeleteMe;
-- Kata 1 - Crea una base de datos privada de nombre: username_Database
    -- Solution:
        CREATE DATABASE username_Database;

-- Kata 2 - Cree una tabla en la base de datos: username_Database
    -- Name: H_users
    -- Campos:
        -- name = 'id' type = 'int' PRIMARY KEY
        -- name = 'username' type = 'varchar (12)' NOT NULL
        -- name = 'password' type = 'varchar (50)' NOT NULL
        -- name = 'registrationDate' type = 'date' NOT NULL

    -- Solution:        
        CREATE TABLE username_Database.H_users (
            id int PRIMARY KEY,
            username varchar (12) NOT NULL,
            password varchar (50) NOT NULL,
            registrationDate Date NOT NULL
        );

-- Kata 3 - Inserte 3 usuarios en la tabla: username_Database.H_users
    -- Solution:
        INSERT INTO username_Database.H_users 
            (username, password)
        VALUES
            ('User0', 'PasswordForUser0', 2020-02-03),
            ('User1', 'PasswordForUser1', 2020-02-03),
            ('User2', 'PasswordForUser2', 2020-02-03);

-- Kata 4 - Cambie la contraseña del usuario 'ChangeMyPassword' a 'ASecurePassword123'
    -- Solution:
        ALTER TABLE username_Database.H_users
        WHERE username = "ChangeMyPassword";

-- Kata 5 - Elimine al usuario 'DeleteMe' en: username_Database.H_users
    -- Solution:
        DELETE FROM username_Database.H_users
        WHERE username = "DeleteMe";

-- Kata 6 - Obtenga todos los usuarios en: exercise_Users.getUsers
    -- Solution:
        SELECT *
        FROM exercise_Users.getUsers;

-- Kata 7 - Obtenga los nombres de cada usuario en: exercise_Users.getUsers
    -- Solution:
        SELECT name
        FROM exercise_Users.getUsers;
-- Kata 8 - Obtenga los nombres de los 10 animales más pesados en: exercise_animals. animals_weights
    -- Solution:
        SELECT name
        FROM exercise_animals.animals_weight
        ORDER BY weight DESC;

-- Kata 9 - Inserte en public_colors.fav_color su color favorito (verde, rojo, azul, amarillo) y su nombre
    -- Solution:
        INSERT INTO public_colors.fav_color 
            (name, color)
        VALUES
            ('User', 'color');
        
-- Kata 10 - Cuente a cuantas personas le gusta su color favorito
        SELECT COUNT(name)
        FROM public_colors.fav_color
        WHERE color = 'color';