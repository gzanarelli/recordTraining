const { header, query, body, param } = require('express-validator/check')

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
      .optional(false)
  ]
}
