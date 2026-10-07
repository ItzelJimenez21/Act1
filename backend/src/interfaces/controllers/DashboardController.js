class DashboardController {
  constructor(getDashboard) {
    this.getDashboard = getDashboard
  }

  getDashboardData = async (req, res) => {
    try {
      const result = await this.getDashboard.execute(req.user)

      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
        data: result.data || null
      })
    } catch (error) {
      console.error(
        '[ERROR] DASHBOARD_CONTROLLER',
        error.message
      )

      return res.status(500).json({
        success: false,
        message: 'Ocurrió un error interno al consultar el Dashboard.'
      })
    }
  }
}

export default DashboardController