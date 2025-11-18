/**
 * @api {get} /auth/me Validate token & get user info
 * @apiName GetMe
 * @apiGroup Auth
 * @apiVersion 1.0.0
 * @apiPermission authenticated
 *
 * @apiDescription Returns the authenticated user's data if the JWT token is valid.
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {String} message Confirmation message.
 * @apiSuccess {Object} user Decoded JWT user payload.
 *
 * @apiError (401) Unauthorized No token provided.
 * @apiError (403) Forbidden Invalid token.
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "message": "token ok",
 *   "user": {
 *     "user_id": 1,
 *     "username": "john",
 *     "role": "admin",
 *     "iat": 1731840000,
 *     "exp": 1732444800
 *   }
 * }
 */