const { header, body, param } = require('express-validator')

module.exports = {
  CREATE: [
    header('token')
      .isJWT(),
    body('label')
      .isString()
      .optional(false),
    body('tag')
      .isString()
      .optional(false),
    body('colorTag')
      .isString()
      .optional(false),
    body('noteId')
      .isMongoId()
      .optional(false),
    body('exercisesId')
      .isMongoId()
      .optional(true)
  ],
  READ: [
    header('token')
      .isJWT(),
    param('sessionId')
      .isMongoId()
      .optional(false)
  ],
  UPDATE: [
    header('token')
      .isJWT(),
    param('sessionId')
      .isMongoId()
      .optional(false),
    body('label')
      .isString()
      .optional(false),
    body('tag')
      .isString()
      .optional(true),
    body('colorTag')
      .isString()
      .optional(true),
    body('exercisesId')
      .isMongoId()
      .optional(true)
  ],
  DELETE: [
    header('token')
      .isJWT(),
    param('sessionId')
      .isMongoId()
      .optional(false)
  ],
  LIST: [
    header('token')
      .isJWT()
  ]
}
