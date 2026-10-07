import {
  Bell,
  LogOut,
  ShieldCheck,
  UserCircle2
} from 'lucide-react'

function Navbar({ username, onLogout }) {
  return (
    <header className="dashboard-navbar">
      <div className="navbar-brand">
        <div className="navbar-brand-icon">
          <ShieldCheck size={26} />
        </div>

        <div>
          <span>ZERO TRUST</span>
          <strong>Security Platform</strong>
        </div>
      </div>

      <div className="navbar-actions">
        <button
          className="navbar-icon-button"
          type="button"
          aria-label="Notificaciones"
        >
          <Bell size={19} />
          <span className="notification-dot"></span>
        </button>

        <div className="navbar-user">
          <div className="navbar-user-icon">
            <UserCircle2 size={22} />
          </div>

          <div className="navbar-user-info">
            <span>Sesión activa</span>
            <strong>{username}</strong>
          </div>
        </div>

        <button
          className="logout-button"
          type="button"
          onClick={onLogout}
        >
          <LogOut size={18} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </header>
  )
}

export default Navbar