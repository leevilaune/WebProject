DROP DATABASE IF EXISTS restaurant_db_prod;
CREATE DATABASE restaurant_db_prod;
USE restaurant_db_prod;

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
    role VARCHAR(50),
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
    status VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE product (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(8,2),
    description TEXT,
    image_url VARCHAR(255),
    category VARCHAR(100),
    default_product BOOLEAN DEFAULT TRUE
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
    FOREIGN KEY (allergen_id) REFERENCES allergen(allergen_id)
);

INSERT INTO user (role, username, password, email, phone_number, address) VALUES
('admin', 'admin', '$2b$10$7JLC2C6LnhICY6qRUogwsuZKtdIzoEVzB2WLkM3XUIrVmcbZjmnYO', 'admin@email.com', NULL, NULL),
('user', 'testuser', '$2b$10$zY1Dl9AkftDmrW61EQhJUeDhQzAHeZimiqhMCSy1kfoz7D0/A0jcm', 'user@email.com', '+35812345678', 'Street 12, Helsinki');

INSERT INTO allergen (allergen_name, allergen_icon_url) VALUES
('dairy', '/uploads/icons/dairy.png'),
('gluten', '/uploads/icons/gluten.png'),
('egg', '/uploads/icons/egg.png'),
('soy', '/uploads/icons/soy.png'),
('nuts', '/uploads/icons/nuts.png'),
('fish', '/uploads/icons/fish.png'),
('shellfish', '/uploads/icons/shellfish.png');

INSERT INTO `option` (name, description) VALUES
('extra cheese', 'More cheese added'),
('no onion', 'Remove onions'),
('gluten-free', 'Prepared with gluten-free ingredients'),
('extra spicy', 'Add extra heat'),
('large size', 'Upgrade to large portion'),
('vegan mayo', 'Replace with vegan mayo'),
('extra sauce', 'Additional sauce portion'),
('fries', 'Side of fries');

INSERT INTO product (name, price, description, image_url, category, default_product) VALUES
('Margherita Pizza', 10.90, 'Classic tomato, mozzarella, basil.', '/uploads/margherita.jpg', 'pizza', TRUE),
('BBQ Chicken Pizza', 13.50, 'Chicken, BBQ sauce, cheese.', '/uploads/bbq_chicken_pizza.jpg', 'pizza', TRUE),
('Pepperoni Pizza', 12.50, 'Pepperoni slices & cheese.', '/uploads/pepperoni_pizza.jpg', 'pizza', TRUE),
('Vegan Burger', 13.90, 'Plant patty with vegan mayo.', '/uploads/vegan_burger.jpg', 'burger', TRUE),
('Cheeseburger', 11.80, 'Beef patty with cheddar.', '/uploads/cheeseburger.jpg', 'burger', TRUE),
('Chicken Wrap', 9.90, 'Grilled chicken tortilla wrap.', '/uploads/chicken_wrap.jpg', 'wrap', TRUE),
('Falafel Wrap', 8.90, 'Falafel, lettuce, tahini.', '/uploads/falafel_wrap.jpg', 'wrap', TRUE),
('Caesar Salad', 9.20, 'Lettuce, parmesan, dressing.', '/uploads/caesar_salad.jpg', 'salad', TRUE),
('Greek Salad', 8.70, 'Feta, olives, cucumber.', '/uploads/greek_salad.jpg', 'salad', TRUE),
('Tomato Soup', 6.50, 'Creamy tomato soup.', '/uploads/tomato_soup.jpg', 'soup', TRUE),
('Fish & Chips', 14.50, 'Battered cod with fries.', '/uploads/fish_and_chips.jpg', 'main', TRUE),
('Shrimp Pasta', 15.90, 'Shrimp in creamy sauce.', '/uploads/shrimp_pasta.jpg', 'pasta', TRUE),
('Veggie Pasta', 12.40, 'Pasta with veggies.', '/uploads/veggie_pasta.jpg', 'pasta', TRUE),
('Chicken Bowl', 11.30, 'Rice bowl with grilled chicken.', '/uploads/chicken_bowl.jpg', 'bowl', TRUE),
('Tofu Bowl', 10.90, 'Rice bowl with tofu.', '/uploads/tofu_bowl.jpg', 'bowl', TRUE),
('Sushi Set A', 16.90, 'Mixed nigiri and maki.', '/uploads/sushi_set_a.jpg', 'sushi', TRUE),
('Sushi Set B', 18.50, 'Large sushi platter.', '/uploads/sushi_set_b.jpg', 'sushi', TRUE),
('Garlic Bread', 4.50, 'Buttery garlic bread.', '/uploads/garlic_bread.jpg', 'side', TRUE),
('French Fries', 3.90, 'Crispy fries.', '/uploads/fries.jpg', 'side', TRUE),
('Chocolate Cake', 5.50, 'Rich chocolate dessert.', '/uploads/chocolate_cake.jpg', 'dessert', TRUE);

INSERT INTO product_allergen (product_id, allergen_id) VALUES
(1,1),(1,2),
(2,1),(2,2),
(3,1),(3,2),
(4,4),(4,2),
(5,1),(5,2),
(6,2),
(8,1),(8,3),(8,6),
(9,1),
(10,1),
(11,6),(11,2),
(12,7),(12,1),(12,2),
(13,2),
(15,4),
(16,6),(16,4),
(17,6),(17,4),
(18,1),(18,2),
(20,1),(20,3),(20,2),(20,5);

INSERT INTO product_option (product_id, option_id) VALUES
(1,1),(1,3),
(2,1),(2,4),
(3,1),(3,4),
(4,6),(4,3),
(5,1),(5,8),
(6,2),(6,8),
(7,2),
(8,1),(8,2),
(9,2),
(10,1),
(11,8),
(12,1),(12,4),
(13,3),
(14,4),
(15,6),
(16,2),
(17,2),
(18,1),
(19,8),
(20,1);

CREATE USER IF NOT EXISTS 'appuser'@'%' IDENTIFIED BY 'StrongPasswordHere';
GRANT ALL PRIVILEGES ON restaurant_db.* TO 'appuser'@'%';
FLUSH PRIVILEGES;