import User from '../../domain/entities/User.js'

class UserRepository {
  constructor() {
    this.users = [
      new User({
        id: 'usr-001',
        username: process.env.APP_USER_USERNAME || 'itzel',
        passwordHash: process.env.APP_USER_PASSWORD_HASH || '',
        role: 'admin'
      })
    ]
  }

  async findByUsername(username) {
    const normalizedUsername = username
      .trim()
      .toLowerCase()

    const user = this.users.find(
      (item) =>
        item.username.toLowerCase() === normalizedUsername
    )

    return user || null
  }

  async findById(id) {
    const user = this.users.find(
      (item) => item.id === id
    )

    return user || null
  }
}

export default UserRepository