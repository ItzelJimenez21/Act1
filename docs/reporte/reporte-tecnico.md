# Reporte técnico
## Actividad 1. Implementación de una aplicación web segura bajo un enfoque Zero Trust en AWS

### Alumna
Itzel Jiménez

### Repositorio
https://github.com/ItzelJimenez21/Act1

---

# 1. Introducción

En esta actividad se implementó una aplicación web distribuida utilizando servicios de Amazon Web Services (AWS) bajo un enfoque de seguridad Zero Trust.

La solución se diseñó separando el Frontend y el Backend en redes virtuales independientes, con el objetivo de reducir la superficie de exposición y limitar la comunicación únicamente a los servicios necesarios.

La aplicación implementa autenticación mediante usuario y contraseña, generación de tokens JWT, protección de rutas, comunicación cifrada mediante HTTPS, mecanismos de protección contra intentos repetidos de autenticación y encabezados HTTP de seguridad.

---

# 2. Objetivo

Desarrollar e implementar una aplicación web segura en AWS aplicando principios de arquitectura de software, seguridad de redes y Zero Trust.

Los principales objetivos fueron:

- Separar Frontend y Backend en VPC independientes.
- Establecer comunicación privada mediante VPC Peering.
- Implementar autenticación mediante JWT.
- Proteger recursos mediante autorización.
- Evitar la exposición pública del Backend.
- Aplicar el principio de mínimo privilegio.
- Implementar HTTPS.
- Configurar Fail2Ban.
- Implementar Security Headers.
- Realizar pruebas de seguridad y conectividad.

---

# 3. Arquitectura de la solución

La infraestructura utiliza dos VPC independientes.

## VPC Frontend

```text
CIDR: 10.0.0.0/27