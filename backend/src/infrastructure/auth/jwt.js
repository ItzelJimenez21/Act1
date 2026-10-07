import jwt from 'jsonwebtoken'
import config from '../../config/config.js'

export function generateToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      username: user.username,
      role: user.role
    },
    config.jwt.secret,
    {
      expiresIn: config.jwt.expiresIn,
      issuer: 'zero-trust-backend',
      audience: 'zero-trust-frontend'
    }
  )
}

export function verifyToken(token) {
  return jwt.verify(
    token,
    config.jwt.secret,
    {
      issuer: 'zero-trust-backend',
      audience: 'zero-trust-frontend'
    }
  )
}