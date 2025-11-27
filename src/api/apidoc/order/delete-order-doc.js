/**
 * @api {delete} /order/:id DELETE order
 * @apiName DeleteOrder
 * @apiGroup Order
 * @apiVersion 1.0.0
 * @apiPermission authenticated
 *
 * @apiDescription Deletes an order by ID and removes all related ordered food items.  
 * Only the order owner or an admin can delete the order.
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} id Order ID.
 *
 * @apiSuccess {Object} deleted Deleted order info.
 * @apiSuccess {Number} deleted.order_number ID of the deleted order.
 *
 * @apiError (403) Forbidden Only the owner or admin can delete the order.
 * @apiError (404) NotFound No order with the given ID.
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "deleted": {
 *     "order_number": 6
 *   }
 * }
 */