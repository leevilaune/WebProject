/**
 * @api {post} /product/add POST product
 * @apiName AddProduct
 * @apiGroup Product
 * @apiVersion 1.0.0
 * @apiPermission authenticated
 *
 * @apiDescription 
 * Creates a new product with optional image upload.  
 * Only admins can set `default_product = true`.  
 * `option_ids` and `allergen_ids` must be sent as JSON arrays inside form-data.
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiBody {String} name Product name (form-data).
 * @apiBody {Number} price Product price (form-data).
 * @apiBody {String} category Product category (form-data).
 * @apiBody {String} [description] Product description (form-data).
 * @apiBody {File} [image] Product image file (form-data, key = `image`).
 * @apiBody {String} option_ids JSON array of option IDs (form-data as string).
 * @apiBody {String} allergen_ids JSON array of allergen IDs (form-data as string).
 *
 * @apiExample {curl} Example Request:
 * curl -X POST http://localhost:3000/product/add \
 * -H "Authorization: Bearer <token>" \
 * -F "name=Cheeseburger" \
 * -F "price=8.99" \
 * -F "category=main" \
 * -F "description=Classic burger with cheese" \
 * -F "option_ids=[1,2]" \
 * -F "allergen_ids=[3]" \
 * -F "image=@/path/to/file.png"
 *
 * @apiSuccess {Boolean} success Indicates if the product was created.
 * @apiSuccess {Object} new The newly created product object.
 * @apiSuccess {Number} new.product_id ID of the product.
 * @apiSuccess {String} new.name Product name.
 * @apiSuccess {Number} new.price Product price.
 * @apiSuccess {String} new.category Product category.
 * @apiSuccess {String} [new.description] Description.
 * @apiSuccess {String} [new.image_url] Filename of uploaded image.
 * @apiSuccess {Boolean} new.default_product True only for admin-created items.
 *
 * @apiError (400) BadRequest Could not create the product.
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "success": true,
 *   "new": {
 *     "product_id": 14,
 *     "name": "Cheeseburger",
 *     "price": 8.99,
 *     "category": "main",
 *     "description": "Classic burger with cheese",
 *     "image_url": "burger-1764161447476.jpg",
 *     "default_product": false
 *   }
 * }
 */