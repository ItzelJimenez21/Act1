class User {
  constructor({
    id,
    username,
    passwordHash,
    role = 'user'
  }) {
    this.id = id
    this.username = username
    this.passwordHash = passwordHash
    this.role = role
  }

  toPublicData() {
    return {
      id: this.id,
      username: this.username,
      role: this.role
    }
  }
}

export default User