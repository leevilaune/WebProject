/**
 * @api {put} /user/:id PUT user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiPermission authenticated
 *
 * @apiDescription 
 * Updates a user's information.  
 * - Admins can update any user.  
 * - Regular users can only update their own account.  
 * - Only admins can update the `role` field.  
 * - Password will be hashed automatically if provided.
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} id User ID.
 *
 * @apiBody {String} [username] New username.
 * @apiBody {String} [password] New password (will be hashed).
 * @apiBody {String} [email] New email address.
 * @apiBody {String} [phone_number] New phone number.
 * @apiBody {String} [address] New address.
 * @apiBody {String} [role] User role (admin-only).
 *
 * @apiExample {json} Request Body Example (regular user):
 * {
 *   "username": "alice_updated",
 *   "password": "newpassword123",
 *   "email": "alice@example.com",
 *   "phone_number": "+35812345678",
 *   "address": "Street 12, Helsinki"
 * }
 *
 * @apiExample {json} Request Body Example (admin updating role):
 * {
 *   "role": "admin"
 * }
 *
 * @apiSuccess {String} message Confirmation message.
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *   "message": "User updated successfully"
 * }
 *
 * @apiError (401) Unauthorized Attempt to update 'role' by non-admin.
 * @apiError (403) Forbidden User cannot update another user's data.
 * @apiError (404) NotFound User not found or no changes made.
 */