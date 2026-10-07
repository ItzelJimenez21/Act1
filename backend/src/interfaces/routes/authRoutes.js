import { Router } from 'express'

import { loginRateLimiter } from '../middleware/rateLimitMiddleware.js'

function createAuthRoutes(authController) {
  const router = Router()

  router.post(
    '/login',
    loginRateLimiter,
    authController.login
  )

  return router
}

export default createAuthRoutes