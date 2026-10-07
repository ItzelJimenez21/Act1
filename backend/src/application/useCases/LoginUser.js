import bcrypt from 'bcryptjs'
import { generateToken } from '../../infrastructure/auth/jwt.js'

class LoginUser {
  constructor(userRepository, authService) {
    this.userRepository = userRepository
    this.authService = authService
  }

  async execute({ username, password }) {
    const validation = this.authService.validateCredentials(
      username,
      password
    )

    if (!validation.valid) {
      return {
        success: false,
        statusCode: 400,
        message: validation.message
      }
    }

    const user = await this.userRepository.findByUsername(
      validation.username
    )

    if (!user || !user.passwordHash) {
      return {
        success: false,
        statusCode: 401,
        message: 'Usuario o contraseña incorrectos.'
      }
    }

    const passwordIsValid = await bcrypt.compare(
      password,
      user.passwordHash
    )

    if (!passwordIsValid) {
      return {
        success: false,
        statusCode: 401,
        message: 'Usuario o contraseña incorrectos.'
      }
    }

    const token = generateToken(user)

    return {
      success: true,
      statusCode: 200,
      message: 'Autenticación exitosa.',
      token,
      user: user.toPublicData()
    }
  }
}

export default LoginUser