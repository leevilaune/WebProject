DROP DATABASE IF EXISTS restaurant_db;
CREATE DATABASE restaurant_db;
USE restaurant_db;

CREATE USER IF NOT EXISTS 'appuser'@'%' IDENTIFIED BY 'StrongPasswordHere';

GRANT ALL PRIVILEGES ON restaurant_db.* TO 'appuser'@'%' IDENTIFIED BY 'StrongPasswordHere';
FLUSH PRIVILEGES;