/**
 * @api {post} /auth/login Login user
 * @apiName PostLogin
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiDescription Authenticates a user using username and password. Returns a JWT token if credentials are valid.
 *
 * @apiBody {String} username Username of the user.
 * @apiBody {String} password User's password.
 *
 * @apiSuccess {Object} user Authenticated user (without password).
 * @apiSuccess {Number} user.user_id User ID.
 * @apiSuccess {String} user.username Username.
 * @apiSuccess {String} user.email Email.
 * @apiSuccess {String} user.role User role.
 * @apiSuccess {String} token JWT token valid for 24 hours.
 *
 * @apiError (404) UserNotFound User not found.
 * @apiError (401) Unauthorized Incorrect password.
 *
 * @apiExample {json} Request Body Example:
 * {
 *   "username": "john",
 *   "password": "mypassword"
 * }
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "user": {
 *     "user_id": 1,
 *     "username": "john",
 *     "email": "john@example.com",
 *     "role": "admin"
 *   },
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 */