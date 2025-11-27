/**
 * @api {delete} /product/:id DELETE product
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiVersion 1.0.0
 * @apiPermission admin
 *
 * @apiDescription Deletes a product by ID. Also removes associated options and allergens. Only admins can delete products.
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} id Product ID.
 *
 * @apiSuccess {Object} deleted Deleted product info.
 * @apiSuccess {Number} deleted.product_id ID of the deleted product.
 *
 * @apiError (403) Forbidden Only admins can delete products.
 * @apiError (404) NotFound No product with the given ID.
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "deleted": {
 *     "product_id": 14
 *   }
 * }
 */