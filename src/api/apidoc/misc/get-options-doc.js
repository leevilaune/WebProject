/**
 * @api {get} /misc/option GET options
 * @apiName GetOptions
 * @apiGroup Misc
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves a list of all extra options available for products.
 *
 * @apiSuccess {Number} option_id Option ID.
 * @apiSuccess {String} name Name of the option.
 * @apiSuccess {String} description Description of the option.
 *
 * @apiSuccessExample {json} Success-Response:
 * [
 *   {
 *     "option_id": 1,
 *     "name": "Extra Cheese",
 *     "description": "Adds extra cheese on top"
 *   },
 *   {
 *     "option_id": 2,
 *     "name": "Spicy Sauce",
 *     "description": "Adds a spicy kick to the dish"
 *   }
 * ]
 */