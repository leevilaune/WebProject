/**
 * @api {post} /user/register Register a new user
 * @apiName AddUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new user. Password is automatically hashed before saving.
 *
 * @apiBody {String} role User role (e.g., "admin", "customer").
 * @apiBody {String} username Unique username.
 * @apiBody {String} password Raw password (will be hashed automatically).
 * @apiBody {String} email User email.
 * @apiBody {String} [phone_number] Optional phone number.
 * @apiBody {String} [address] Optional address.
 *
 * @apiSuccess {String} message Confirmation message.
 * @apiSuccess {Number} id ID of the created user.
 *
 * @apiError (400) BadRequest Error creating user.
 *
 * @apiExample {json} Request Body Example:
 * {
 *   "role": "customer",
 *   "username": "alice",
 *   "password": "mypassword123",
 *   "email": "alice@example.com",
 *   "phone_number": "+35812345678",
 *   "address": "Street 12, Helsinki"
 * }
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "message": "User created",
 *   "id": 5
 * }
 */