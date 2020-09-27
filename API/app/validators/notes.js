const { header, query, body, param } = require('express-validator/check')

module.exports = {
  CREATE: [
    body('label')
      .isString()
      .optional(false),
		body('userId')
			.isMongoId()
			.optional(false),
		body('sessionId')
			.isMongoId()
			.optional(true)
  ],
  READ: [
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
	],
	UPDATE: [

	],
	DELETE: [

	]
}
