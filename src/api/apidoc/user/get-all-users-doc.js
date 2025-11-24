/**
 * @api {get} /user/all GET all users
 * @apiName FindAllUsers
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiPermission admin
 *
 * @apiDescription Returns a list of all users. Admin permissions required. Password field is excluded.
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {Object[]} users List of users.
 * @apiSuccess {Number} users.user_id User ID.
 * @apiSuccess {String} users.role User role.
 * @apiSuccess {String} users.username Username.
 * @apiSuccess {String} users.email Email address.
 * @apiSuccess {String} [users.phone_number] Phone number.
 * @apiSuccess {String} [users.address] Address.
 *
 * @apiError (403) Forbidden Only admins may access this endpoint.
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * [
 *   {
 *     "user_id": 1,
 *     "role": "admin",
 *     "username": "john",
 *     "email": "john@example.com",
 *     "phone_number": "+3581234567",
 *     "address": "Test street 1"
 *   }
 * ]
 */