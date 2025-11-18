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