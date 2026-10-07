import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Activity,
  Cloud,
  KeyRound,
  LockKeyhole,
  Network,
  Server,
  ShieldCheck,
  Wifi
} from 'lucide-react'

import api from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'

import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import SecurityCard from '../components/SecurityCard.jsx'

import '../styles/dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const [backendStatus, setBackendStatus] = useState('Verificando...')
  const [backendOnline, setBackendOnline] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyProtectedResource = async () => {
      try {
        const response = await api.get('/dashboard')

        setBackendOnline(true)
        setBackendStatus(
          response.data?.message || 'Conexión segura establecida'
        )
      } catch (error) {
        setBackendOnline(false)

        if (error.response?.status === 401) {
          logout()
          navigate('/login', { replace: true })
          return
        }

        setBackendStatus('No fue posible contactar al Backend')
      } finally {
        setLoading(false)
      }
    }

    verifyProtectedResource()
  }, [logout, navigate])

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="dashboard-page">
      <Navbar
        username={user?.username || 'Usuario'}
        onLogout={handleLogout}
      />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-main">
          <section className="dashboard-hero">
            <div>
              <div className="dashboard-badge">
                <ShieldCheck size={16} />
                ZERO TRUST ACTIVE
              </div>

              <h1>Security Dashboard</h1>

              <p>
                Monitoreo del estado de autenticación, infraestructura y
                controles de seguridad de la aplicación.
              </p>
            </div>

            <div className="hero-security-icon">
              <ShieldCheck size={46} strokeWidth={1.5} />
            </div>
          </section>

          <section className="security-grid">
            <SecurityCard
              icon={<KeyRound size={23} />}
              title="Autenticación JWT"
              value="Activa"
              description="Token requerido para recursos protegidos."
              status="success"
            />

            <SecurityCard
              icon={<LockKeyhole size={23} />}
              title="HTTPS"
              value="Protegido"
              description="Comunicación cifrada mediante TLS."
              status="success"
            />

            <SecurityCard
              icon={<Network size={23} />}
              title="Zero Trust"
              value="Habilitado"
              description="Acceso basado en validación y mínimo privilegio."
              status="success"
            />

            <SecurityCard
              icon={<Server size={23} />}
              title="Backend"
              value={backendOnline ? 'Online' : 'Verificando'}
              description={backendStatus}
              status={backendOnline ? 'success' : 'warning'}
            />
          </section>

          <section className="dashboard-content-grid">
            <article className="dashboard-panel">
              <div className="panel-header">
                <div>
                  <span className="panel-eyebrow">
                    ESTADO DE SEGURIDAD
                  </span>

                  <h2>Controles activos</h2>
                </div>

                <Activity size={22} />
              </div>

              <div className="security-list">
                <div className="security-list-item">
                  <div className="security-list-icon">
                    <KeyRound size={19} />
                  </div>

                  <div className="security-list-info">
                    <strong>Identidad verificada</strong>
                    <span>
                      Sesión autenticada mediante JSON Web Token
                    </span>
                  </div>

                  <span className="security-state success">
                    Activo
                  </span>
                </div>

                <div className="security-list-item">
                  <div className="security-list-icon">
                    <Network size={19} />
                  </div>

                  <div className="security-list-info">
                    <strong>Segmentación de red</strong>
                    <span>
                      Frontend y Backend separados en VPC independientes
                    </span>
                  </div>

                  <span className="security-state success">
                    Activo
                  </span>
                </div>

                <div className="security-list-item">
                  <div className="security-list-icon">
                    <Cloud size={19} />
                  </div>

                  <div className="security-list-info">
                    <strong>Infraestructura AWS</strong>
                    <span>
                      Comunicación privada mediante VPC Peering
                    </span>
                  </div>

                  <span className="security-state success">
                    Seguro
                  </span>
                </div>

                <div className="security-list-item">
                  <div className="security-list-icon">
                    <ShieldCheck size={19} />
                  </div>

                  <div className="security-list-info">
                    <strong>Protección de acceso</strong>
                    <span>
                      Validación de solicitudes y principio de mínimo privilegio
                    </span>
                  </div>

                  <span className="security-state success">
                    Activo
                  </span>
                </div>
              </div>
            </article>

            <article className="dashboard-panel connection-panel">
              <div className="panel-header">
                <div>
                  <span className="panel-eyebrow">
                    CONECTIVIDAD
                  </span>

                  <h2>Frontend ↔ Backend</h2>
                </div>

                <Wifi size={22} />
              </div>

              <div
                className={`connection-indicator ${
                  backendOnline ? 'connected' : ''
                }`}
              >
                <div className="connection-ring">
                  <Server size={34} />
                </div>

                <div>
                  <span className="connection-label">
                    API BACKEND
                  </span>

                  <strong>
                    {loading
                      ? 'Verificando conexión...'
                      : backendOnline
                        ? 'Conexión privada disponible'
                        : 'Backend no disponible'}
                  </strong>
                </div>
              </div>

              <div className="connection-route">
                <div className="route-node">
                  <span>Frontend VPC</span>
                  <strong>10.0.0.0/27</strong>
                </div>

                <div className="route-line">
                  <span></span>
                </div>

                <div className="route-node">
                  <span>Backend VPC</span>
                  <strong>10.0.1.0/27</strong>
                </div>
              </div>

              <div className="connection-message">
                <ShieldCheck size={18} />

                <p>
                  La comunicación entre servicios se realiza bajo controles
                  de autenticación, segmentación y acceso mínimo necesario.
                </p>
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Dashboard