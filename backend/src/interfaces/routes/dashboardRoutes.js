import { Router } from 'express'

import { authMiddleware } from '../middleware/authMiddleware.js'

function createDashboardRoutes(dashboardController) {
  const router = Router()

  router.get(
    '/',
    authMiddleware,
    dashboardController.getDashboardData
  )

  return router
}

export default createDashboardRoutes