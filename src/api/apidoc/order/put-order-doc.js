/**
 * @api {put} /order/:id PUT order
 * @apiName PutOrder
 * @apiGroup Order
 * @apiVersion 1.0.0
 * @apiPermission authenticated
 *
 * @apiDescription Updates the delivery address of an existing order.  
 * Only the order owner or an admin can update the order.
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} id Order ID.
 *
 * @apiBody {String} [delivery_address] New delivery address.
 *
 * @apiExample {json} Request Body Example:
 * {
 *   "delivery_address": "123 New Street, Helsinki"
 * }
 *
 * @apiSuccess {Object} updated Updated order object.
 * @apiSuccess {Number} updated.order_number Order ID.
 * @apiSuccess {String} updated.delivery_address Updated delivery address.
 * @apiSuccess {Number} updated.price Total price.
 * @apiSuccess {Number} updated.user_id User ID who placed the order.
 * @apiSuccess {Number} updated.timestamp Timestamp of the order.
 *
 * @apiSuccessExample {json} Success Response:
 * {
 *   "updated": {
 *     "order_number": 6,
 *     "delivery_address": "123 New Street, Helsinki",
 *     "price": 12.5,
 *     "user_id": 2,
 *     "timestamp": 1763999999
 *   }
 * }
 *
 * @apiError (403) Forbidden Only the owner or admin can update the order.
 * @apiError (404) NotFound No order with the given ID.
 */