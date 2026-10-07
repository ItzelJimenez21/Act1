import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Eye,
  EyeOff,
  LockKeyhole,
  LogIn,
  ShieldCheck,
  User
} from 'lucide-react'

import api from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import '../styles/login.css'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }))

    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Ingresa tu usuario y contraseña.')
      return
    }

    try {
      setLoading(true)
      setError('')

      const response = await api.post('/auth/login', {
        username: formData.username.trim(),
        password: formData.password
      })

      const { token, user } = response.data

      if (!token) {
        throw new Error('El servidor no devolvió un token válido.')
      }

      login(token, user)

      navigate('/dashboard', {
        replace: true
      })
    } catch (requestError) {
      const message =
        requestError.response?.data?.message ||
        'No fue posible iniciar sesión. Verifica tus credenciales.'

      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">
      <div className="login-background">
        <div className="login-glow login-glow-one"></div>
        <div className="login-glow login-glow-two"></div>
      </div>

      <section className="login-container">
        <div className="login-brand">
          <div className="brand-icon">
            <ShieldCheck size={38} strokeWidth={1.8} />
          </div>

          <div>
            <span className="brand-label">SECURE ACCESS</span>
            <h1>Zero Trust</h1>
          </div>
        </div>

        <div className="login-card">
          <div className="login-card-header">
            <div className="security-status">
              <span className="status-dot"></span>
              Acceso protegido
            </div>

            <h2>Bienvenida</h2>

            <p>
              Autentícate para acceder al panel seguro de la plataforma.
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Usuario</label>

              <div className="input-wrapper">
                <User size={19} />

                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Ingresa tu usuario"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>

              <div className="input-wrapper">
                <LockKeyhole size={19} />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ingresa tu contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  disabled={loading}
                />

                <button
                  className="password-toggle"
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={
                    showPassword
                      ? 'Ocultar contraseña'
                      : 'Mostrar contraseña'
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="login-error" role="alert">
                {error}
              </div>
            )}

            <button
              className="login-button"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="button-loader"></span>
                  Verificando...
                </>
              ) : (
                <>
                  <LogIn size={19} />
                  Iniciar sesión
                </>
              )}
            </button>
          </form>

          <div className="login-security">
            <ShieldCheck size={17} />

            <span>
              Protegido mediante autenticación JWT y principios Zero Trust
            </span>
          </div>
        </div>

        <p className="login-footer">
          Zero Trust Security Platform · Actividad 1
        </p>
      </section>
    </main>
  )
}

export default Login