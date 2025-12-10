/**
 * @api {get} /misc/allergen GET allergens
 * @apiName GetAllergens
 * @apiGroup Misc
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves a list of all allergens stored in the system.
 *
 * @apiSuccess {Number} allergen_id Allergen ID.
 * @apiSuccess {String} allergen_name Name of the allergen.
 * @apiSuccess {String} allergen_icon_url URL to the allergen icon.
 *
 * @apiSuccessExample {json} Success-Response:
 * [
 *   {
 *     "allergen_id": 1,
 *     "allergen_name": "Gluten",
 *     "allergen_icon_url": "/img/allergen/gluten.png"
 *   },
 *   {
 *     "allergen_id": 2,
 *     "allergen_name": "Dairy",
 *     "allergen_icon_url": "/img/allergen/dairy.png"
 *   }
 * ]
 */