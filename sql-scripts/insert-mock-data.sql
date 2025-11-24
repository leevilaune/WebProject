INSERT INTO user (`role`, username, password, email, phone_number, address, createdAt, updatedAt) VALUES
('customer', 'alice', 'pass123', 'alice@example.com', '0401234567', 'mannerheimintie 10, helsinki', NOW(), NOW()),
('customer', 'bob', 'securepw', 'bob@example.com', '0459876543', 'aleksanterinkatu 3, helsinki', NOW(), NOW()),
('admin', 'admin1', 'adminpw', 'admin@example.com', NULL, NULL, NOW(), NOW());

INSERT INTO product (name, price, description, image_url, category, allergen, default_product, createdAt, updatedAt) VALUES
('margherita pizza', 10.90, 'classic pizza with tomato, mozzarella and basil', '/img/pizza1.jpg', 'pizza', 'dairy, gluten', TRUE, NOW(), NOW()),
('pepperoni pizza', 12.50, 'spicy pepperoni with cheese and tomato sauce', '/img/pizza2.jpg', 'pizza', 'dairy, gluten', FALSE, NOW(), NOW()),
('caesar salad', 9.20, 'romaine lettuce, parmesan, croutons and dressing', '/img/salad1.jpg', 'salad', 'dairy, egg, gluten', TRUE, NOW(), NOW()),
('vegan burger', 13.50, 'plant-based patty with lettuce, tomato and vegan mayo', '/img/burger1.jpg', 'burger', 'gluten', TRUE, NOW(), NOW());

INSERT INTO `option` (name, description, createdAt, updatedAt) VALUES
('extra cheese', 'add more mozzarella cheese', NOW(), NOW()),
('gluten-free dough', 'use gluten-free pizza base', NOW(), NOW()),
('spicy sauce', 'add hot chili sauce', NOW(), NOW()),
('fries', 'add a side of fries', NOW(), NOW());

INSERT INTO product_option (product_id, option_id, createdAt, updatedAt) VALUES
(1, 1, NOW(), NOW()),
(1, 2, NOW(), NOW()),
(2, 1, NOW(), NOW()),
(2, 3, NOW(), NOW()),
(4, 4, NOW(), NOW());

INSERT INTO allergen (allergen_name, allergen_icon_url, createdAt, updatedAt) VALUES
('dairy', '/icons/dairy.png', NOW(), NOW()),
('gluten', '/icons/gluten.png', NOW(), NOW()),
('egg', '/icons/egg.png', NOW(), NOW());

INSERT INTO product_allergen (product_id, allergen_id, createdAt, updatedAt) VALUES
(1, 1, NOW(), NOW()),
(1, 2, NOW(), NOW()),
(2, 1, NOW(), NOW()),
(2, 2, NOW(), NOW()),
(3, 1, NOW(), NOW()),
(3, 2, NOW(), NOW()),
(3, 3, NOW(), NOW()),
(4, 2, NOW(), NOW());

INSERT INTO `order` (delivery_address, price, timestamp, user_id, createdAt, updatedAt) VALUES
('mannerheimintie 10, helsinki', 23.40, UNIX_TIMESTAMP(), 1, NOW(), NOW()),
('aleksanterinkatu 3, helsinki', 12.50, UNIX_TIMESTAMP(), 2, NOW(), NOW());

INSERT INTO ordered_food (order_number, product_id, createdAt, updatedAt) VALUES
(1, 1, NOW(), NOW()),
(1, 3, NOW(), NOW()),
(2, 2, NOW(), NOW());