const { header, query, body, param } = require('express-validator')

module.exports = {
  CREATE: [
    header('token')
      .isJWT(),
    body('label')
      .isString()
      .optional(false),
    body('sessionId')
      .isMongoId()
      .optional(true)
  ],
  READ: [
    header('token')
      .isJWT(),
    param('noteId')
      .isMongoId()
      .optional(false)
  ],
  UPDATE: [
    header('token')
      .isJWT(),
    param('noteId')
      .isMongoId()
      .optional(false),
    body('label')
      .isString()
      .optional(false),
    body('sessionId')
      .isMongoId()
      .optional(true)
  ],
  DELETE: [
    header('token')
      .isJWT(),
    param('noteId')
      .isMongoId()
      .optional(false)
  ],
  LIST: [
    header('token')
      .isJWT()
  ]
}
