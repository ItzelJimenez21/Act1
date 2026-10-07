function SecurityCard({
  icon,
  title,
  value,
  description,
  status = 'success'
}) {
  return (
    <article className={`security-card ${status}`}>
      <div className="security-card-top">
        <div className="security-card-icon">
          {icon}
        </div>

        <span className={`security-card-status ${status}`}>
          {status === 'success' ? 'Seguro' : 'Atención'}
        </span>
      </div>

      <div className="security-card-content">
        <span className="security-card-title">
          {title}
        </span>

        <strong className="security-card-value">
          {value}
        </strong>

        <p className="security-card-description">
          {description}
        </p>
      </div>
    </article>
  )
}

export default SecurityCard