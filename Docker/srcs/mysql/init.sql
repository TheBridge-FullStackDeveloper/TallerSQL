SET PASSWORD FOR 'root'@'localhost' = PASSWORD('IAmTheAdminBitch*');
FLUSH PRIVILEGES;
update mysql.user set plugin = 'mysql_native_password' where user='root';   
CREATE DATABASE users;
CREATE TABLE users.users (username varchar(50) NOT NULL PRIMARY KEY, password varchar(50) NOT NULL)