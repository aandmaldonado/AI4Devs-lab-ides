# Sistema ATS (Applicant Tracking System)

Sistema completo de gestión de candidatos con React frontend y Express backend, usando Prisma ORM y PostgreSQL.

## 🚀 Características

- **Frontend**: React con TypeScript, Tailwind CSS, y validación en tiempo real
- **Backend**: Express.js con TypeScript, Prisma ORM, y validaciones robustas
- **Base de Datos**: PostgreSQL con migraciones automáticas
- **Validación**: Errores específicos por campo con feedback detallado al usuario
- **Testing**: Tests unitarios y de integración completos
- **Seguridad**: Middleware de seguridad y validación de entrada
- **Logging**: Sistema de logs estructurado

## 📋 Estado del Proyecto

✅ **Completado**:
- Backend con validaciones detalladas y manejo de errores específicos por campo
- Frontend con interfaz moderna y manejo robusto de errores
- Sistema de testing completo (backend: 3 tests, frontend: 12 tests)
- Base de datos con migraciones y seeding
- Documentación completa

## 🛠️ Instalación

### Prerrequisitos
- Node.js v20.x o superior
- Docker y Docker Compose
- npm o yarn

### Configuración

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd AI4Devs-lab-ides
```

2. **Configurar base de datos**
```bash
docker-compose up -d
```

3. **Configurar backend**
```bash
cd backend
npm install
npx prisma migrate dev
npm run seed
```

4. **Configurar frontend**
```bash
cd frontend
npm install
```

## 🚀 Ejecución

### Desarrollo

**Backend:**
```bash
cd backend
npm run dev
```
Servidor disponible en: http://localhost:3010

**Frontend:**
```bash
cd frontend
npm start
```
Aplicación disponible en: http://localhost:3000

### Testing

**Backend:**
```bash
cd backend
npm test
```

**Frontend:**
```bash
cd frontend
npm test
```

## 📁 Estructura del Proyecto

```
AI4Devs-lab-ides/
├── backend/                 # Servidor Express
│   ├── src/
│   │   ├── controllers/     # Controladores de la API
│   │   ├── services/        # Lógica de negocio
│   │   ├── repositories/    # Acceso a datos
│   │   ├── middleware/      # Middleware personalizado
│   │   ├── routes/          # Rutas de la API
│   │   ├── validators/      # Validaciones de entrada
│   │   └── types/           # Tipos TypeScript
│   └── prisma/              # Esquema y migraciones de BD
├── frontend/                # Aplicación React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── services/        # Servicios de API
│   │   ├── types/           # Tipos TypeScript
│   │   └── tests/           # Tests del frontend
└── docs/                    # Documentación
```

## 🔧 API Endpoints

### Candidatos
- `GET /api/candidatos` - Listar candidatos con filtros
- `GET /api/candidatos/:id` - Obtener candidato por ID
- `POST /api/candidatos` - Crear nuevo candidato
- `PUT /api/candidatos/:id` - Actualizar candidato
- `DELETE /api/candidatos/:id` - Eliminar candidato

### Validación
El sistema incluye validación robusta con errores específicos por campo:
- Validación de formato de email
- Validación de longitud de campos
- Validación de campos requeridos
- Feedback detallado al usuario

## 🧪 Testing

El proyecto incluye tests completos para validar:
- Funcionalidad de la API
- Manejo de errores de validación
- Componentes del frontend
- Servicios de API

**Ejecutar todos los tests:**
```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

## 📝 Historial de Desarrollo

### Última Actualización (27 Junio 2025)
- **Bug Fix**: Resuelto problema de validación donde se mostraban errores genéricos en lugar de errores específicos por campo
- **Mejoras**: 
  - Backend mejorado para devolver errores detallados por campo
  - Frontend actualizado para mostrar errores específicos via toast notifications
  - Tests agregados para validar el manejo de errores con `fieldErrors`
- **Resultado**: Mejor experiencia de usuario con feedback específico de validación

Ver `prompts-iniciales.md` para el historial completo de desarrollo.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.