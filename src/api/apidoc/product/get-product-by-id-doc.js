/**
 * @api {get} /product/:id GET product by ID
 * @apiName GetProductById
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiDescription Fetch a single product by its ID.  
 * Does **not** include options or allergens — only the base product data.
 *
 * @apiParam {Number} id Product ID.
 *
 * @apiSuccess {Object} product The fetched product.
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
 *   "createdAt": "2025-12-01T12:44:22.000Z",
 *   "updatedAt": "2025-12-01T12:44:22.000Z"
 * }
 *
 * @apiError (404) NotFound Product not found.
 */