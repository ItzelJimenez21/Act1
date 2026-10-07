import { rateLimit } from 'express-rate-limit'

import config from '../../config/config.js'
import { writeSecurityLog } from '../../infrastructure/logging/securityLogger.js'

export const loginRateLimiter = rateLimit({
  windowMs:
    config.loginSecurity.windowMinutes * 60 * 1000,

  limit: config.loginSecurity.maxAttempts,

  standardHeaders: 'draft-7',
  legacyHeaders: false,

  skipSuccessfulRequests: true,

  message: {
    success: false,
    message:
      'Demasiados intentos de inicio de sesión. Intenta nuevamente más tarde.'
  },

  handler: (req, res, next, options) => {
    writeSecurityLog('RATE_LIMIT', {
      ip: req.ip,
      username: req.body?.username || 'unknown',
      requestPath: req.originalUrl
    })

    console.warn(
      `[SECURITY] RATE_LIMIT IP=${req.ip} PATH=${req.originalUrl}`
    )

    return res
      .status(options.statusCode)
      .json(options.message)
  }
})