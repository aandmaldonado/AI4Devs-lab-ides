# LTI - Sistema de Seguimiento de Talento (ATS)

Este proyecto es una aplicación full-stack con un frontend en React y un backend en Express usando Prisma como ORM. El frontend se inicia con Create React App y el backend está escrito en TypeScript.

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js (v16 o superior)
- Docker y Docker Compose
- npm o yarn

### 1. Configurar la Base de Datos
```bash
# Iniciar PostgreSQL con Docker
docker-compose up -d
```

### 2. Instalar Dependencias
```bash
# Instalar todas las dependencias (backend y frontend)
npm run install:all

# O instalar por separado:
npm run install:backend
npm run install:frontend
```

### 3. Configurar la Base de Datos
```bash
# Configurar Prisma y ejecutar migraciones
npm run db:setup

# O ejecutar paso a paso:
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### 4. Iniciar la Aplicación
```bash
# Terminal 1: Iniciar backend
npm run dev:backend

# Terminal 2: Iniciar frontend
npm run dev:frontend
```

## 📁 Estructura del Proyecto

```
AI4Devs-lab-ides/
├── backend/                 # Servidor Express + TypeScript
│   ├── src/
│   │   ├── config/         # Configuración (DB, Logger)
│   │   ├── controllers/    # Controladores HTTP
│   │   ├── services/       # Lógica de negocio
│   │   ├── repositories/   # Acceso a datos
│   │   ├── validators/     # Validaciones
│   │   ├── types/          # Interfaces TypeScript
│   │   ├── middleware/     # Middleware de seguridad
│   │   ├── routes/         # Rutas RESTful
│   │   └── scripts/        # Scripts de seed
│   ├── prisma/             # Esquema de base de datos
│   └── package.json
├── frontend/               # Aplicación React + TypeScript
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── services/       # Servicios de API
│   │   └── types/          # Interfaces TypeScript
│   └── package.json
├── docs/                   # Documentación
├── docker-compose.yml      # Configuración de Docker
└── package.json           # Scripts del proyecto raíz
```

## 🔧 Comandos Disponibles

### Desde el directorio raíz:
```bash
# Instalación
npm run install:all         # Instalar backend y frontend
npm run install:backend     # Solo backend
npm run install:frontend    # Solo frontend

# Base de datos
npm run db:setup           # Configurar DB completa
npm run prisma:generate    # Generar cliente Prisma
npm run prisma:migrate     # Ejecutar migraciones
npm run prisma:seed        # Poblar con datos dummy

# Desarrollo
npm run dev:backend        # Servidor backend (puerto 3010)
npm run dev:frontend       # Servidor frontend (puerto 3000)

# Build
npm run build:backend      # Compilar backend
npm run build:frontend     # Compilar frontend

# Tests
npm run test:backend       # Tests del backend
npm run test:frontend      # Tests del frontend
```

### Desde el directorio backend:
```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

### Desde el directorio frontend:
```bash
cd frontend
npm install
npm start
```

## 🌐 Endpoints de la API

- `GET /` - Información del servidor
- `GET /health` - Health check
- `GET /api/candidatos` - Listar candidatos
- `POST /api/candidatos` - Crear candidato
- `GET /api/candidatos/:id` - Obtener candidato
- `PUT /api/candidatos/:id` - Actualizar candidato
- `DELETE /api/candidatos/:id` - Eliminar candidato

## 🗄️ Base de Datos

### Configuración PostgreSQL
- **Host:** localhost
- **Puerto:** 5432
- **Usuario:** LTIdbUser
- **Contraseña:** D1ymf8wyQEGthFR1E9xhCq
- **Base de datos:** LTIdb

### Modelo de Datos
```prisma
model Candidato {
  id           Int      @id @default(autoincrement())
  nombre       String   @db.VarChar(100)
  apellido     String   @db.VarChar(100)
  email        String   @unique @db.VarChar(150)
  telefono     String?  @db.VarChar(20)
  direccion    String?  @db.VarChar(200)
  educacion    String?  @db.VarChar(200)
  experiencia  String?  @db.VarChar(500)
  cvUrl        String?  @db.VarChar(300)
  creadoEn     DateTime @default(now())
}
```

## 🔒 Características de Seguridad

- **Rate Limiting:** 100 requests/minuto por IP
- **Headers de Seguridad:** Helmet.js
- **CORS:** Configurado para frontend
- **Validación:** Joi para validación de datos
- **Logging:** Winston para logging estructurado
- **Sanitización:** Prevención de XSS e inyección SQL

## 🎨 Frontend

- **Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Formularios:** React Hook Form
- **Notificaciones:** React Toastify
- **HTTP Client:** Axios
- **Diseño:** Responsivo y accesible

## 🧪 Testing

```bash
# Backend tests
npm run test:backend

# Frontend tests
npm run test:frontend
```

- Los tests de backend validan el JSON real devuelto por el endpoint raíz (`/`).
- Los tests de frontend usan la configuración por defecto de react-scripts para máxima compatibilidad.
- Se recomienda usar mocks para dependencias externas (axios, react-toastify) en los tests de React.
- Si se requiere soporte avanzado para ESModules, considerar migrar a Vite + Vitest o Next.js.

## 🚨 Solución de Problemas

### Error: "Could not read package.json"
**Problema:** Ejecutar comandos de Prisma desde el directorio raíz.
**Solución:** Usar los scripts del package.json raíz o navegar al directorio backend.

### Error: "Debug Failure. False expression: Non-string value passed to ts.resolveTypeReferenceDirective"
**Problema:** Conflicto de versiones entre TypeScript y ts-node al ejecutar `npm run prisma:seed`.
**Solución:** 
```bash
# Actualizar versiones en backend/package.json
npm install typescript@^5.3.3 ts-node@^10.9.2 ts-node-dev@^2.0.0
# Reinstalar dependencias
npm install
```

### Error: "ReferenceError: cors is not defined"
**Problema:** Falta importación de `cors` en `backend/src/index.ts`.
**Solución:** 
```typescript
// Agregar esta importación en backend/src/index.ts
import cors from 'cors';
```

### Error de conexión a la base de datos
**Problema:** PostgreSQL no está ejecutándose.
**Solución:** `docker-compose up -d`

### Error de migración
**Problema:** Esquema de Prisma no sincronizado.
**Solución:** `npm run prisma:generate && npm run prisma:migrate`

### Error: "TypeError: Cannot read properties of undefined (reading 'html')" en tests de frontend
**Problema:** Incompatibilidad entre versiones de Jest, jsdom y/o ts-jest, especialmente con Node.js experimental.
**Solución:**
- Usar Node.js LTS (v20.x o v18.x) y limpiar/reinstalar dependencias.
- Eliminar configuraciones personalizadas de Jest y usar la configuración por defecto de react-scripts.
- Adaptar los tests para usar mocks en dependencias externas (axios, react-toastify).
- Para tests TypeScript, asegurarse de que los archivos sean módulos (`export {}` al final si es necesario).

## 📚 Documentación Adicional

- [Requerimientos Técnicos](./docs/requerimientos.md)
- [Historia de Usuario](./docs/hdu.md)
- [Prompts Iniciales](./prompts-iniciales.md)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo [LICENSE.md](LICENSE.md) para más detalles.