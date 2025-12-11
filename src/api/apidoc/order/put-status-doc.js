/**
 * @api {put} /order/status/:id PUT status
 * @apiName PutOrderStatus
 * @apiGroup Order
 * @apiVersion 1.0.0
 * @apiPermission admin
 *
 * @apiDescription 
 * Updates the status of an order.  
 * Only **admins** can change an order's status.  
 * Allowed status values are:
 * - `"received"`
 * - `"preparing"`
 * - `"completed"`
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} id Order ID.
 *
 * @apiBody {String="received","preparing","completed"} status New order status.
 *
 * @apiExample {json} Request Body Example:
 * {
 *   "status": "preparing"
 * }
 *
 * @apiSuccess {Object} updated Updated order object.
 * @apiSuccess {Number} updated.order_number Order ID.
 * @apiSuccess {String} updated.delivery_address Delivery address.
 * @apiSuccess {Number} updated.price Total price.
 * @apiSuccess {Number} updated.user_id User ID who placed the order.
 * @apiSuccess {Number} updated.timestamp Timestamp of the order.
 * @apiSuccess {String} updated.status Updated order status.
 *
 * @apiSuccessExample {json} Success Response:
 * {
 *   "updated": {
 *     "order_number": 12,
 *     "delivery_address": "123 Test Street",
 *     "price": 19.99,
 *     "user_id": 5,
 *     "timestamp": 1764991000,
 *     "status": "preparing"
 *   }
 * }
 *
 * @apiError (400) BadRequest Invalid status value.
 * @apiError (403) Forbidden Only admins can update order status.
 * @apiError (404) NotFound No order with the given ID.
 */