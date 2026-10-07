import bcrypt from 'bcryptjs'

const password = process.env.APP_TEMP_PASSWORD

if (!password) {
  console.error('')
  console.error('ERROR: APP_TEMP_PASSWORD no está definida.')
  console.error('')
  console.error(
    'Define temporalmente la contraseña antes de ejecutar este script.'
  )
  console.error('')

  process.exit(1)
}

if (password.length < 10) {
  console.error('')
  console.error(
    'ERROR: La contraseña debe tener al menos 10 caracteres.'
  )
  console.error('')

  process.exit(1)
}

try {
  const saltRounds = 12

  const passwordHash = await bcrypt.hash(
    password,
    saltRounds
  )

  console.log('')
  console.log('==============================================')
  console.log('       HASH BCRYPT GENERADO CORRECTAMENTE')
  console.log('==============================================')
  console.log('')
  console.log(passwordHash)
  console.log('')
  console.log(
    'Copia este hash en APP_USER_PASSWORD_HASH dentro de .env'
  )
  console.log('')
} catch (error) {
  console.error('')
  console.error(
    'No fue posible generar el hash:',
    error.message
  )
  console.error('')

  process.exit(1)
}