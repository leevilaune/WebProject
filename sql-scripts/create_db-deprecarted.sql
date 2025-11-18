-- DO NOT USE --
DROP DATABASE IF EXISTS restaurant_db;
CREATE DATABASE restaurant_db;
USE restaurant_db;

DROP TABLE IF EXISTS product_allergen;
DROP TABLE IF EXISTS product_option;
DROP TABLE IF EXISTS ordered_food;
DROP TABLE IF EXISTS `order`;
DROP TABLE IF EXISTS `option`;
DROP TABLE IF EXISTS allergen;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS user;

CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    `role` VARCHAR(50),
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(150),
    phone_number VARCHAR(30),
    address VARCHAR(255)
);

CREATE TABLE `order` (
    order_number INT AUTO_INCREMENT PRIMARY KEY,
    delivery_address VARCHAR(255),
    price DECIMAL(8,2),
    timestamp BIGINT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE product (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(8,2),
    description TEXT,
    image_url VARCHAR(255),
    category VARCHAR(100),
    allergen VARCHAR(255),
    default_product BOOLEAN DEFAULT FALSE
);

CREATE TABLE ordered_food (
    order_number INT,
    product_id INT,
    PRIMARY KEY (order_number, product_id),
    FOREIGN KEY (order_number) REFERENCES `order`(order_number),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

CREATE TABLE `option` (
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description VARCHAR(255)
);

CREATE TABLE product_option (
    product_id INT,
    option_id INT,
    PRIMARY KEY (product_id, option_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (option_id) REFERENCES `option`(option_id)
);

CREATE TABLE allergen (
    allergen_id INT AUTO_INCREMENT PRIMARY KEY,
    allergen_name VARCHAR(100),
    allergen_icon_url VARCHAR(255)
);

CREATE TABLE product_allergen (
    product_id INT,
    allergen_id INT,
    PRIMARY KEY (product_id, allergen_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (allergen_id) REFERENCES allergen(id)
);

INSERT INTO user (`role`, username, password, email, phone_number, address) VALUES
('customer', 'alice', 'pass123', 'alice@example.com', '0401234567', 'mannerheimintie 10, helsinki'),
('customer', 'bob', 'securepw', 'bob@example.com', '0459876543', 'aleksanterinkatu 3, helsinki'),
('admin', 'admin1', 'adminpw', 'admin@example.com', NULL, NULL);

INSERT INTO product (name, price, description, image_url, category, allergen, default_product) VALUES
('margherita pizza', 10.90, 'classic pizza with tomato, mozzarella and basil', '/img/pizza1.jpg', 'pizza', 'dairy, gluten', TRUE),
('pepperoni pizza', 12.50, 'spicy pepperoni with cheese and tomato sauce', '/img/pizza2.jpg', 'pizza', 'dairy, gluten', FALSE),
('caesar salad', 9.20, 'romaine lettuce, parmesan, croutons and dressing', '/img/salad1.jpg', 'salad', 'dairy, egg, gluten', TRUE),
('vegan burger', 13.50, 'plant-based patty with lettuce, tomato and vegan mayo', '/img/burger1.jpg', 'burger', 'gluten', TRUE);

INSERT INTO `option` (name, description) VALUES
('extra cheese', 'add more mozzarella cheese'),
('gluten-free dough', 'use gluten-free pizza base'),
('spicy sauce', 'add hot chili sauce'),
('fries', 'add a side of fries');

INSERT INTO product_option (product_id, option_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 3),
(4, 4);

INSERT INTO allergen (allergen_name, allergen_icon_url) VALUES
('dairy', '/icons/dairy.png'),
('gluten', '/icons/gluten.png'),
('egg', '/icons/egg.png');

INSERT INTO product_allergen (product_id, allergen_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2),
(3, 1),
(3, 2),
(3, 3),
(4, 2);

INSERT INTO `order` (delivery_address, price, timestamp, user_id) VALUES
('mannerheimintie 10, helsinki', 23.40, UNIX_TIMESTAMP(), 1),
('aleksanterinkatu 3, helsinki', 12.50, UNIX_TIMESTAMP(), 2);

INSERT INTO ordered_food (order_number, product_id) VALUES
(1, 1),
(1, 3),
(2, 2);

CREATE USER IF NOT EXISTS 'appuser'@'%' IDENTIFIED BY 'StrongPasswordHere';

GRANT ALL PRIVILEGES ON restaurant_db.* TO 'appuser'@'%' IDENTIFIED BY 'StrongPasswordHere';
FLUSH PRIVILEGES;