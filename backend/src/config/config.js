import dotenv from 'dotenv'

dotenv.config()

const config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  frontendUrl:
    process.env.FRONTEND_URL || 'http://localhost:5173',

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1h'
  },

  loginSecurity: {
    windowMinutes:
      Number(process.env.LOGIN_WINDOW_MINUTES) || 10,

    maxAttempts:
      Number(process.env.LOGIN_MAX_ATTEMPTS) || 5
  }
}

if (!config.jwt.secret) {
  throw new Error(
    'JWT_SECRET no está definido en las variables de entorno.'
  )
}

export default config