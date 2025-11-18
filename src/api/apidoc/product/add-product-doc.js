/**
 * @api {post} /product/add Add a new product
 * @apiName AddProduct
 * @apiGroup Product
 * @apiVersion 1.0.0
 * @apiPermission admin
 *
 * @apiDescription Creates a new product. Only admins can access this endpoint.
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiBody {String} name Product name.
 * @apiBody {Number} price Product price.
 * @apiBody {String} category Product category.
 * @apiBody {String} [description] Product description.
 * @apiBody {String} [image_url] Product image URL.
 * @apiBody {Boolean} default_product Whether it's a default product.
 * @apiBody {Number[]} [option_ids] List of option IDs to associate.
 * @apiBody {Number[]} [allergen_ids] List of allergen IDs to associate.
 *
 * @apiSuccess {Boolean} success Indicates success.
 * @apiSuccess {Object} new Newly created product object.
 * @apiSuccess {Number} new.product_id ID of the product.
 * @apiSuccess {String} new.name Product name.
 * @apiSuccess {Number} new.price Product price.
 * @apiSuccess {String} new.category Product category.
 * @apiSuccess {String} [new.description] Product description.
 * @apiSuccess {String} [new.image_url] Product image URL.
 * @apiSuccess {Boolean} new.default_product Whether it's a default product.
 *
 * @apiError (403) Forbidden No access.
 * @apiError (400) BadRequest Could not create the product.
 *
 * @apiExample {json} Request Body Example:
 * {
 *   "name": "Pizza Margherita",
 *   "price": 12.5,
 *   "category": "pizza",
 *   "description": "Classic pizza with tomatoes and mozzarella.",
 *   "image_url": "https://example.com/pizza.jpg",
 *   "default_product": false,
 *   "option_ids": [1, 2],
 *   "allergen_ids": [3]
 * }
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "success": true,
 *   "new": {
 *     "product_id": 10,
 *     "name": "Pizza Margherita",
 *     "price": 12.5,
 *     "category": "pizza",
 *     "description": "Classic pizza with tomatoes and mozzarella.",
 *     "image_url": "https://example.com/pizza.jpg",
 *     "default_product": false
 *   }
 * }
 */