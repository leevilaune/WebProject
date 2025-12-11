/**
 * @api {get} /product/:id GET product by ID
 * @apiName GetProductById
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiDescription
 * Fetch a single product by its ID, including related **options** and **allergens**.
 *
 * @apiParam {Number} id Product ID.
 *
 * @apiSuccess {Number} product_id Product ID.
 * @apiSuccess {String} name Product name.
 * @apiSuccess {Number} price Product price.
 * @apiSuccess {String} description Product description.
 * @apiSuccess {String} image_url Image URL or filename.
 * @apiSuccess {String} category Product category.
 * @apiSuccess {Boolean} default_product Whether this is a default product.
 * @apiSuccess {Object[]} options List of options for the product.
 * @apiSuccess {Number} options.option_id Option ID.
 * @apiSuccess {String} options.name Option name.
 * @apiSuccess {String} options.description Option description.
 * @apiSuccess {Object[]} allergens List of allergens for the product.
 * @apiSuccess {Number} allergens.allergen_id Allergen ID.
 * @apiSuccess {String} allergens.allergen_name Allergen name.
 * @apiSuccess {String} allergens.allergen_icon_url URL of allergen icon.
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "product_id": 12,
 *   "name": "Chicken Bowl",
 *   "price": 9.99,
 *   "description": "Healthy chicken rice bowl",
 *   "image_url": "chicken_bowl.jpg",
 *   "category": "bowl",
 *   "default_product": true,
 *   "options": [
 *     {
 *       "option_id": 3,
 *       "name": "Extra Chicken",
 *       "description": "Add 50g more chicken"
 *     }
 *   ],
 *   "allergens": [
 *     {
 *       "allergen_id": 1,
 *       "allergen_name": "Gluten",
 *       "allergen_icon_url": "/icons/gluten.png"
 *     },
 *     {
 *       "allergen_id": 2,
 *       "allergen_name": "Milk",
 *       "allergen_icon_url": "/icons/milk.png"
 *     }
 *   ],
 *   "createdAt": "2025-12-01T12:44:22.000Z",
 *   "updatedAt": "2025-12-01T12:44:22.000Z"
 * }
 *
 * @apiError (404) NotFound Product not found.
 */