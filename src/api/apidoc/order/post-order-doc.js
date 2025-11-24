/**
 * @api {post} /order/ POST order
 * @apiName PostOrder
 * @apiGroup Order
 * @apiVersion 1.0.0
 * @apiPermission authenticated
 *
 * @apiDescription Creates a new order with specified products.
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiBody {String} delivery_address Delivery address.
 * @apiBody {Number} price Total price.
 * @apiBody {Number} user_id ID of the user placing the order.
 * @apiBody {Number[]} [product_ids] Array of product IDs to include in the order.
 *
 * @apiSuccess {Boolean} success Indicates success.
 * @apiSuccess {Object} new Newly created order.
 * @apiSuccess {Number} new.order_number Order ID.
 * @apiSuccess {String} new.delivery_address Delivery address.
 * @apiSuccess {Number} new.price Total price.
 * @apiSuccess {Number} new.timestamp Timestamp of the order.
 * @apiSuccess {Number} new.user_id User ID.
 *
 * @apiError (400) BadRequest Could not create the order.
 *
 * @apiExample {json} Request Body Example:
 * {
 *   "delivery_address": "Street 1, City",
 *   "price": 12.5,
 *   "user_id": 2,
 *   "product_ids": [3,4,5]
 * }
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "success": true,
 *   "new": {
 *     "order_number": 6,
 *     "delivery_address": "Street 1, City",
 *     "price": 12.5,
 *     "timestamp": 1763999999,
 *     "user_id": 2
 *   }
 * }
 */