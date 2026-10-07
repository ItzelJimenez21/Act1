class AuthService {
  validateCredentials(username, password) {
    if (
      typeof username !== 'string' ||
      typeof password !== 'string'
    ) {
      return {
        valid: false,
        message: 'Las credenciales no tienen un formato válido.'
      }
    }

    const normalizedUsername = username.trim()

    if (!normalizedUsername || !password) {
      return {
        valid: false,
        message: 'Usuario y contraseña son obligatorios.'
      }
    }

    if (normalizedUsername.length < 3) {
      return {
        valid: false,
        message: 'El usuario no tiene un formato válido.'
      }
    }

    if (password.length < 6) {
      return {
        valid: false,
        message: 'La contraseña no tiene un formato válido.'
      }
    }

    return {
      valid: true,
      username: normalizedUsername
    }
  }

  canAccessDashboard(user) {
    if (!user) {
      return false
    }

    return ['user', 'admin'].includes(user.role)
  }
}

export default AuthService