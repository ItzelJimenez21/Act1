class GetDashboard {
  constructor(authService) {
    this.authService = authService
  }

  async execute(user) {
    if (!user) {
      return {
        success: false,
        statusCode: 401,
        message: 'Autenticación requerida.'
      }
    }

    const hasAccess = this.authService.canAccessDashboard(user)

    if (!hasAccess) {
      return {
        success: false,
        statusCode: 403,
        message: 'No tienes permisos para acceder a este recurso.'
      }
    }

    return {
      success: true,
      statusCode: 200,
      message: 'Conexión segura con el Backend establecida.',
      data: {
        service: 'Zero Trust Backend',
        authenticated: true,
        authorization: 'granted',
        username: user.username,
        role: user.role,
        security: {
          jwt: 'active',
          zeroTrust: 'enabled',
          privateCommunication: 'enabled'
        }
      }
    }
  }
}

export default GetDashboard