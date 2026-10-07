# 🔐 Política de Seguridad

Este proyecto fue desarrollado con fines académicos para demostrar la implementación de una aplicación web segura bajo un enfoque Zero Trust en AWS.

## Principios aplicados

La solución considera los siguientes controles:

- Autenticación mediante usuario y contraseña
- Generación y validación de JWT
- Autorización para recursos protegidos
- Segmentación de red mediante VPC independientes
- Comunicación privada mediante VPC Peering
- Backend sin exposición pública directa
- Security Groups con mínimo privilegio
- HTTPS mediante Nginx, Certbot y Let's Encrypt
- Rate Limiting en el endpoint de autenticación
- Fail2Ban para intentos repetidos de acceso
- Security Headers
- Protección contra Clickjacking
- Protección contra MIME Sniffing
- Content Security Policy
- Restricción de CORS
- Contraseñas almacenadas mediante hash bcrypt

---

## Información sensible

No deben almacenarse en el repositorio:

```text
.env
JWT_SECRET
Contraseñas reales
Llaves privadas
Certificados privados
Credenciales de AWS
Tokens de acceso
Logs con información sensible