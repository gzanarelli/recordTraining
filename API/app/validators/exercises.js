const { header, body, param } = require('express-validator')

module.exports = {
  CREATE: [
    header('token')
      .isJWT(),
    body('label')
      .isString()
      .optional(false),
    body('value')
      .isString()
      .optional(false),
    body('numberSessions')
      .isInt({ min: 1, max: 99 })
      .optional(false),
    body('numberRepetitions')
      .isInt({ min: 1, max: 99 })
      .optional(false),
    body('weight')
      .isInt({ min: 0, max: 999 })
      .optional(false),
    body('timeOut')
      .isInt({ min: 0, max: 999 })
      .optional(false)
  ],
  READ: [
    header('token')
      .isJWT(),
    param('exerciseId')
      .isMongoId()
      .optional(false)
  ],
  UPDATE: [
    header('token')
      .isJWT(),
    param('exerciseId')
      .isMongoId()
      .optional(false),
    body('sessionId')
      .isMongoId()
      .optional(true),
    body('label')
      .isString()
      .optional(true),
    body('value')
      .isString()
      .optional(true),
    body('numberSessions')
      .isInt({ min: 1, max: 99 })
      .optional(true),
    body('numberRepetitions')
      .isInt({ min: 1, max: 99 })
      .optional(true),
    body('weight')
      .isInt({ min: 1, max: 999 })
      .optional(true),
    body('timeOut')
      .isInt({ min: 0, max: 999 })
      .optional(true)

  ],
  DELETE: [
    header('token')
      .isJWT(),
    param('exerciseId')
      .isMongoId()
      .optional(false)
  ],
  LIST: [
    header('token')
      .isJWT()
  ]
}
