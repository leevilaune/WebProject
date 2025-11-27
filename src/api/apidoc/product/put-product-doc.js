/**
 * @api {put} /product/:id PUT product
 * @apiName PutProduct
 * @apiGroup Product
 * @apiVersion 1.0.0
 * @apiPermission admin
 *
 * @apiDescription Updates an existing product by ID. Only admins can update products.
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} id Product ID.
 *
 * @apiBody {String} [name] Product name.
 * @apiBody {Number} [price] Product price.
 * @apiBody {String} [category] Product category.
 * @apiBody {String} [description] Product description.
 * @apiBody {String} [image_url] Product image filename.
 * @apiBody {Boolean} [default_product] Default product flag.
 *
 * @apiExample {json} Request Body Example:
 * {
 *   "name": "Double Cheeseburger",
 *   "price": 9.99,
 *   "category": "main",
 *   "description": "Classic burger with double cheese",
 *   "image_url": "burger-1764161447476.jpg",
 *   "default_product": true
 * }
 *
 * @apiSuccess {Object} updated Updated product object.
 * @apiSuccess {Number} updated.product_id Product ID.
 * @apiSuccess {String} updated.name Product name.
 * @apiSuccess {Number} updated.price Product price.
 * @apiSuccess {String} updated.category Product category.
 * @apiSuccess {String} [updated.description] Description.
 * @apiSuccess {String} [updated.image_url] Image filename.
 * @apiSuccess {Boolean} updated.default_product Default product flag.
 *
 * @apiSuccessExample {json} Success Response:
 * {
 *   "updated": {
 *     "product_id": 14,
 *     "name": "Double Cheeseburger",
 *     "price": 9.99,
 *     "category": "main",
 *     "description": "Classic burger with double cheese",
 *     "image_url": "burger-1764161447476.jpg",
 *     "default_product": true
 *   }
 * }
 *
 * @apiError (403) Forbidden Only admins can update products.
 * @apiError (404) NotFound No product with the given ID.
 */