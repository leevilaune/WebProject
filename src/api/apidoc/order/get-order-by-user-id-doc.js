/**
 * @api {get} /order/byuser/:id GET orders by user ID
 * @apiName GetOrdersByUserId
 * @apiGroup Order
 * @apiVersion 1.0.0
 * @apiPermission authenticated
 *
 * @apiDescription 
 * Returns all orders made by the specified user.  
 * Admins can view any user's orders.  
 * Regular users can only access **their own** orders.
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} id User ID whose orders should be returned.
 *
 * @apiSuccess {Object[]} orders List of orders for the specified user.
 * @apiSuccess {Number} orders.order_number Order ID.
 * @apiSuccess {String} orders.delivery_address Delivery address.
 * @apiSuccess {Number} orders.price Total price.
 * @apiSuccess {Number} orders.user_id ID of the user who placed the order.
 * @apiSuccess {Number} orders.timestamp Timestamp when the order was created.
 *
 * @apiSuccess {Object[]} orders.products Products belonging to this order.
 * @apiSuccess {Number} orders.products.product_id Product ID.
 * @apiSuccess {String} orders.products.name Product name.
 * @apiSuccess {Number} orders.products.price Product price.
 * @apiSuccess {String} orders.products.description Product description.
 * @apiSuccess {String} orders.products.image_url Image URL.
 * @apiSuccess {String} orders.products.category Product category.
 * @apiSuccess {Boolean} orders.products.default_product Default product flag.
 *
 * @apiSuccess {Object[]} orders.products.options Options for the product.
 * @apiSuccess {Number} orders.products.options.option_id Option ID.
 * @apiSuccess {String} orders.products.options.name Option name.
 * @apiSuccess {String} orders.products.options.description Option description.
 *
 * @apiSuccess {Object[]} orders.products.allergens Allergens for the product.
 * @apiSuccess {Number} orders.products.allergens.allergen_id Allergen ID.
 * @apiSuccess {String} orders.products.allergens.allergen_name Allergen name.
 * @apiSuccess {String} orders.products.allergens.allergen_icon_url Allergen icon URL.
 *
 * @apiExample {json} Success Example:
 * [
 *   {
 *     "order_number": 10,
 *     "delivery_address": "Testikatu 5, Helsinki",
 *     "price": 15.50,
 *     "user_id": 3,
 *     "timestamp": 1765002000,
 *     "products": [
 *       {
 *         "product_id": 4,
 *         "name": "Vegan Burger",
 *         "price": 13.5,
 *         "description": "Plant-based patty with lettuce and vegan mayo",
 *         "image_url": "/img/burger1.jpg",
 *         "category": "burger",
 *         "default_product": true,
 *         "options": [
 *           {
 *             "option_id": 1,
 *             "name": "Extra Sauce",
 *             "description": "Add vegan mayo"
 *           }
 *         ],
 *         "allergens": [
 *           {
 *             "allergen_id": 2,
 *             "allergen_name": "Soy",
 *             "allergen_icon_url": "/img/icons/soy.png"
 *           }
 *         ]
 *       }
 *     ]
 *   }
 * ]
 *
 * @apiError (403) Forbidden User cannot access another user's orders unless admin.
 */