/**
 * @api {get} /product/all GET all default products
 * @apiName GetAllProducts
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiDescription Returns all products where `default_product = true`, including related options and allergens.
 *
 * @apiSuccess {Object[]} products List of products.
 * @apiSuccess {Number} products.product_id Product ID.
 * @apiSuccess {String} products.name Product name.
 * @apiSuccess {Number} products.price Product price.
 * @apiSuccess {String} products.category Product category.
 * @apiSuccess {String} [products.description] Product description.
 * @apiSuccess {String} [products.image_url] Product image URL.
 * @apiSuccess {Boolean} products.default_product Whether it's a default product.
 *
 * @apiSuccess {Object[]} products.options Linked options.
 * @apiSuccess {Number} products.options.option_id Option ID.
 * @apiSuccess {String} products.options.name Option name.
 * @apiSuccess {String} [products.options.description] Option description.
 *
 * @apiSuccess {Object[]} products.allergens Linked allergens.
 * @apiSuccess {Number} products.allergens.allergen_id Allergen ID.
 * @apiSuccess {String} products.allergens.allergen_name Allergen name.
 * @apiSuccess {String} products.allergens.allergen_icon_url Allergen icon URL.
 *
 * @apiError (404) NotFound No default products exist.
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * [
 *   {
 *     "product_id": 1,
 *     "name": "Burger",
 *     "price": 8.99,
 *     "category": "food",
 *     "description": "A tasty burger",
 *     "image_url": "https://example.com/burger.jpg",
 *     "default_product": true,
 *     "options": [
 *       {
 *         "option_id": 2,
 *         "name": "Extra Cheese",
 *         "description": "Add cheese"
 *       }
 *     ],
 *     "allergens": [
 *       {
 *         "allergen_id": 1,
 *         "allergen_name": "Lactose",
 *         "allergen_icon_url": "https://example.com/icons/lactose.png"
 *       }
 *     ]
 *   }
 * ]
 */