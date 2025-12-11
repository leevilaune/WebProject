/**
 * @api {post} /product/add/copy POST product without image
 * @apiName PostProductWithoutImage
 * @apiGroup Product
 * @apiVersion 1.0.0
 * @apiPermission authenticated
 *
 * @apiDescription
 * Creates a new product **without uploading an image file**.  
 * Admin users automatically mark products as `default_product = true`.  
 * Option and allergen relations can be attached using ID arrays.
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiBody {String} name Product name.
 * @apiBody {Number} price Product price.
 * @apiBody {String} category Product category.
 * @apiBody {String} description Product description.
 * @apiBody {String} [image_url] Full URL or local path to the image.
 * @apiBody {Number[]} [option_ids] Array of option IDs to attach.
 * @apiBody {Number[]} [allergen_ids] Array of allergen IDs to attach.
 *
 * @apiExample {json} Request Example:
 * {
 *   "name": "BBQ Chicken Pizza",
 *   "price": 14.99,
 *   "category": "pizza",
 *   "description": "Smoky BBQ sauce with grilled chicken",
 *   "image_url": "/uploads/products/bbq-chicken.jpg",
 *   "option_ids": [1, 3, 4],
 *   "allergen_ids": [1, 2]
 * }
 *
 * @apiSuccess {Object} new The newly created product.
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "new": {
 *     "product_id": 41,
 *     "name": "BBQ Chicken Pizza",
 *     "price": 14.99,
 *     "category": "pizza",
 *     "description": "Smoky BBQ sauce with grilled chicken",
 *     "image_url": "/uploads/products/bbq-chicken.jpg",
 *     "default_product": true,
 *     "updatedAt": "2025-12-11T15:22:31.000Z",
 *     "createdAt": "2025-12-11T15:22:31.000Z"
 *   }
 * }
 *
 * @apiError (400) BadRequest Could not create a product (validation or DB error).
 */