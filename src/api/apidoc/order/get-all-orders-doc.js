/**
 * @api {get} /order/all GET all orders
 * @apiName GetAllOrders
 * @apiGroup Order
 * @apiVersion 1.0.0
 * @apiPermission admin
 *
 * @apiDescription Returns all orders with their associated products, including options and allergens.
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {Object[]} orders List of orders.
 * @apiSuccess {Number} orders.order_number Order ID.
 * @apiSuccess {String} orders.delivery_address Delivery address.
 * @apiSuccess {Number} orders.price Total price.
 * @apiSuccess {Number} orders.timestamp Timestamp of the order.
 * @apiSuccess {Number} orders.user_id User ID.
 * @apiSuccess {Object[]} orders.products List of associated products.
 * @apiSuccess {Number} orders.products.product_id Product ID.
 * @apiSuccess {String} orders.products.name Product name.
 * @apiSuccess {Number} orders.products.price Product price.
 * @apiSuccess {String} [orders.products.description] Product description.
 * @apiSuccess {String} [orders.products.image_url] Product image URL.
 * @apiSuccess {String} orders.products.category Product category.
 * @apiSuccess {Boolean} orders.products.default_product Default product flag.
 * @apiSuccess {Object[]} orders.products.options Linked options.
 * @apiSuccess {Number} orders.products.options.option_id Option ID.
 * @apiSuccess {String} orders.products.options.name Option name.
 * @apiSuccess {String} [orders.products.options.description] Option description.
 * @apiSuccess {Object[]} orders.products.allergens Linked allergens.
 * @apiSuccess {Number} orders.products.allergens.allergen_id Allergen ID.
 * @apiSuccess {String} orders.products.allergens.allergen_name Allergen name.
 * @apiSuccess {String} orders.products.allergens.allergen_icon_url Allergen icon URL.
 *
 * @apiError (401) Unauthorized User not authenticated.
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * [
 *   {
 *     "order_number": 1,
 *     "delivery_address": "Street 1, City",
 *     "price": 12.5,
 *     "timestamp": 1763990497,
 *     "user_id": 2,
 *     "products": [
 *       {
 *         "product_id": 3,
 *         "name": "Pizza Margherita",
 *         "price": 12.5,
 *         "description": "Classic pizza",
 *         "image_url": "https://example.com/pizza.jpg",
 *         "category": "pizza",
 *         "default_product": true,
 *         "options": [
 *           {"option_id":1, "name":"Extra Cheese", "description":"Add cheese"}
 *         ],
 *         "allergens": [
 *           {"allergen_id":1, "allergen_name":"Lactose", "allergen_icon_url":"https://example.com/icons/lactose.png"}
 *         ]
 *       }
 *     ]
 *   }
 * ]
 */