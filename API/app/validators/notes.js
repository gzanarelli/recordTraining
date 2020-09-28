const { header, query, body, param } = require('express-validator')

module.exports = {
  CREATE: [
    header('token')
      .isMongoId(),
    body('label')
      .isString()
      .optional(false),
    body('sessionId')
      .isMongoId()
      .optional(true)
  ],
  READ: [
    header('token')
      .isMongoId(),
    param('noteId')
      .isMongoId()
      .optional(false)
  ],
  UPDATE: [
    header('token')
      .isMongoId(),
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
      .isMongoId(),
    param('noteId')
      .isMongoId()
      .optional(false)
  ],
  LIST: [
    header('token')
      .isMongoId()
  ]
}
