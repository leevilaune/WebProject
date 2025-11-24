/**
 * @api {get} /user/:id GET user by id
 * @apiName GetUserById
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiPermission admin|self
 *
 * @apiDescription Returns a user's details by ID. Admins can access any user; regular users can only access their own data.
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} id User ID.
 *
 * @apiSuccess {Number} user_id User ID.
 * @apiSuccess {String} role User role.
 * @apiSuccess {String} username Username.
 * @apiSuccess {String} email Email address.
 * @apiSuccess {String} [phone_number] Phone number.
 * @apiSuccess {String} [address] Address.
 *
 * @apiError (403) Forbidden User cannot access this resource.
 * @apiError (404) NotFound User not found.
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "user_id": 2,
 *   "role": "user",
 *   "username": "alice",
 *   "email": "alice@example.com",
 *   "phone_number": "+35812345678",
 *   "address": "Street 12, Helsinki"
 * }
 */