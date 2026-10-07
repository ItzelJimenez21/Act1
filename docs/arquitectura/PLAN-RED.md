# 🌐 Plan de direccionamiento y red
## Actividad 1 — Zero Trust en AWS

Este documento describe el direccionamiento IP, las redes, las instancias y los puertos utilizados en la arquitectura.

---

# 1. Resumen de redes

La solución utiliza dos VPC independientes con máscara `/27`.

| Componente | CIDR |
|---|---|
| VPC Frontend | `10.0.0.0/27` |
| VPC Backend | `10.0.1.0/27` |

La comunicación entre ambas redes se realizará mediante:

```text
VPC Peering