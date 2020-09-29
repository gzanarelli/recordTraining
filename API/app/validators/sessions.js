const { header, body, param } = require('express-validator')

module.exports = {
  CREATE: [
    header('token')
      .isMongoId(),
    body('label')
      .isString()
      .optional(false),
    body('noteId')
      .isMongoId()
      .optional(false),
    body('exerciceId')
      .isMongoId()
      .optional(true)
  ],
  READ: [
    header('token')
      .isMongoId(),
    param('sessionId')
      .isMongoId()
      .optional(false)
  ],
  UPDATE: [
    header('token')
      .isMongoId(),
    param('sessionId')
      .isMongoId()
      .optional(false),
    body('label')
      .isString()
      .optional(false),
    body('exerciceId')
      .isMongoId()
      .optional(true)
  ],
  DELETE: [
    header('token')
      .isMongoId(),
    param('sessionId')
      .isMongoId()
      .optional(false)
  ],
  LIST: [
    header('token')
      .isMongoId()
  ]
}
