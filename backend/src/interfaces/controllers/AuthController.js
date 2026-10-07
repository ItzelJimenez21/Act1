import { writeSecurityLog } from '../../infrastructure/logging/securityLogger.js'

class AuthController {
  constructor(loginUser) {
    this.loginUser = loginUser
  }

  login = async (req, res) => {
    try {
      const { username, password } = req.body

      const result = await this.loginUser.execute({
        username,
        password
      })

      if (!result.success) {
        writeSecurityLog('LOGIN_FAILED', {
          ip: req.ip,
          username: username || 'unknown',
          requestPath: req.originalUrl
        })

        console.warn(
          `[SECURITY] LOGIN_FAILED IP=${req.ip} USER=${username || 'unknown'}`
        )

        return res.status(result.statusCode).json({
          success: false,
          message: result.message
        })
      }

      writeSecurityLog('LOGIN_SUCCESS', {
        ip: req.ip,
        username: result.user.username,
        requestPath: req.originalUrl
      })

      console.info(
        `[SECURITY] LOGIN_SUCCESS IP=${req.ip} USER=${result.user.username}`
      )

      return res.status(result.statusCode).json({
        success: true,
        message: result.message,
        token: result.token,
        user: result.user
      })
    } catch (error) {
      writeSecurityLog('LOGIN_ERROR', {
        ip: req.ip,
        username: req.body?.username || 'unknown',
        requestPath: req.originalUrl
      })

      console.error(
        '[ERROR] AUTH_CONTROLLER',
        error.message
      )

      return res.status(500).json({
        success: false,
        message: 'Ocurrió un error interno durante la autenticación.'
      })
    }
  }
}

export default AuthController