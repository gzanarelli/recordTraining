const { header, query, body, param } = require('express-validator')

module.exports = {
  LOGIN: [
    body('email')
      .isEmail()
      .optional(false),
    body('password')
      .optional(false)
  ],
  SIGNUP: [
    body('email')
      .isEmail()
      .optional(false),
    body('password')
      .isLength({ min: 8 })
      .matches(/[a-zA-Z]/)
      .matches(/[\d]/)
      .matches(/[\W]/)
      .optional(false),
    body('pseudo')
      .isLength({ min: 3, max: 16 })
      .isString()
      .optional(false)
  ]
}
