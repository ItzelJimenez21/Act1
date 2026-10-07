import {
  Activity,
  LayoutDashboard,
  Network,
  ShieldCheck
} from 'lucide-react'

function Sidebar() {
  return (
    <aside className="dashboard-sidebar">
      <nav className="sidebar-nav">
        <button
          type="button"
          className="sidebar-item active"
        >
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </button>

        <button
          type="button"
          className="sidebar-item"
        >
          <ShieldCheck size={19} />
          <span>Seguridad</span>
        </button>

        <button
          type="button"
          className="sidebar-item"
        >
          <Network size={19} />
          <span>Red</span>
        </button>

        <button
          type="button"
          className="sidebar-item"
        >
          <Activity size={19} />
          <span>Actividad</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-security-box">
          <div className="sidebar-security-icon">
            <ShieldCheck size={20} />
          </div>

          <div>
            <span>Estado</span>
            <strong>Protegido</strong>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar