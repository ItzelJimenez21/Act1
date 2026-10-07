import express from 'express'
import cors from 'cors'

import config from './config/config.js'

import AuthService from './domain/services/AuthService.js'
import UserRepository from './infrastructure/repositories/UserRepository.js'

import LoginUser from './application/useCases/LoginUser.js'
import GetDashboard from './application/useCases/GetDashboard.js'

import AuthController from './interfaces/controllers/AuthController.js'
import DashboardController from './interfaces/controllers/DashboardController.js'

import createAuthRoutes from './interfaces/routes/authRoutes.js'
import createDashboardRoutes from './interfaces/routes/dashboardRoutes.js'

import { securityHeaders } from './interfaces/middleware/securityHeaders.js'

const app = express()

/* ============================================================
   CONFIGURACIÓN GENERAL
============================================================ */

app.disable('x-powered-by')

app.set('trust proxy', [
  'loopback',
  '10.0.0.0/27'
])

app.use(securityHeaders)

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin === config.frontendUrl) {
        return callback(null, true)
      }

      return callback(
        new Error('Origen no permitido por la política CORS.')
      )
    },
    methods: [
      'GET',
      'POST'
    ],
    allowedHeaders: [
      'Content-Type',
      'Authorization'
    ],
    credentials: false
  })
)

app.use(
  express.json({
    limit: '10kb'
  })
)

/* ============================================================
   DEPENDENCIAS
============================================================ */

const userRepository = new UserRepository()
const authService = new AuthService()

const loginUser = new LoginUser(
  userRepository,
  authService
)

const getDashboard = new GetDashboard(
  authService
)

const authController = new AuthController(
  loginUser
)

const dashboardController = new DashboardController(
  getDashboard
)

/* ============================================================
   RUTAS
============================================================ */

app.get('/api/health', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Zero Trust Backend operativo.',
    status: 'online',
    environment: config.nodeEnv
  })
})

app.use(
  '/api/auth',
  createAuthRoutes(authController)
)

app.use(
  '/api/dashboard',
  createDashboardRoutes(dashboardController)
)

/* ============================================================
   RUTA NO ENCONTRADA
============================================================ */

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: 'Recurso no encontrado.'
  })
})

/* ============================================================
   MANEJO GLOBAL DE ERRORES
============================================================ */

app.use((error, req, res, next) => {
  console.error(
    `[ERROR] ${error.message}`
  )

  return res.status(500).json({
    success: false,
    message: 'Ocurrió un error interno en el servidor.'
  })
})

/* ============================================================
   INICIO DEL SERVIDOR
============================================================ */

app.listen(
  config.port,
  '0.0.0.0',
  () => {
    console.log('')
    console.log('==============================================')
    console.log('     ZERO TRUST BACKEND - ACTIVO')
    console.log('==============================================')
    console.log(`Puerto:      ${config.port}`)
    console.log(`Entorno:     ${config.nodeEnv}`)
    console.log(`Frontend:    ${config.frontendUrl}`)
    console.log('Health:      /api/health')
    console.log('Login:       /api/auth/login')
    console.log('Dashboard:   /api/dashboard')
    console.log('==============================================')
    console.log('')
  }
)