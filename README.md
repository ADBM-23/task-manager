# task-manager // Gestor de Tareas

Aplicación full-stack de gestión de tareas (monorepo) con:
- *Backend*: Node.js/Express REST API con base de datos MySQL
- *Frontend*: Angular 21 standalone con Material Design
- *Base de datos*: MySQL 8+ con una tabla tasks
  
---

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:
- Node.js
- npm
- MySQL 8+
- Git

--
## Clonacion repositorio
Terminal VS CODE
git clone ->  https://github.com/ADBM-23/task-manager.git  -
cd task-manager
--- 

## Instalación de MySQL

## macOS

# Opción 1: Homebrew
- brew install mysql
- brew services start mysql
- mysql_secure_installation          # Opcional: asegurar la instalación

# Opción 2: Instalador desde https://dev.mysql.com/downloads/mysql/
  Selecciona macOS, descarga el .dmg y sigue el instalador

## Windows

# MySQL Installer
- Descarga desde https://dev.mysql.com/downloads/installer/
- Ejecuta mysql-installer-community-*.exe y sigue el asistente
- Selecciona "Developer Default" o "Server only" 
- Preferencia escoger sin contraseña

# Después de instalar, inicia el servicio (power shell o terminal como administrador): 
- net start MySQL80
- & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" --version "
- & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p (oprimir enter si no tiene contraseña de mysql , si se puso, poner contraseña de mysql)
- (si ya esta funcionando no usar siguientes pasos)
- Abrir en explorador de archivos  C:\ProgramData\MySQL\MySQL Server 8.0\my.ini  (buscar port= 3306)
- & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p -h 127.0.0.1 -P 3306
- deberia aparecer: Welcome to the MySQL monitor

# Creacion de la base de datos
- database.dql       (se puede copiar y pegar en la terminal o usar programa como Workbench)
- En la carpeta task-manager abrir terminal
- Get-Content .\database.sql 
- Get-Content .\database.sql | & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p -h 127.0.0.1 -P 3306
- & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p -h 127.0.0.1 -P 3307
- show databases;

## Comandos de desarrollo
### Backend

- bash
- cd backend       ó     # abrir la terminal dentro de la carpeta backend
- npm install            # Instalar las dependencias
- npm install express mysql2 cors dotenv  (asegurar que esten todas las dependencias)
- node server.js         # Iniciar node  http://localhost:3000


### Frontend (Angular)

- bash
- npm install -g @angular/cli  #abrir terminal en la carpeta frontend
- ng serve              # Inicia el servidor en http://localhost:4200
- (si hay algun problema intentar instalar angular material) 
- ng add @angular/material  #tras ponerlo en la terminal, escoger yes - color de preferencia

---

### Variables de entorno
Crea un archivo .env en el directorio backend/:
- DB_HOST=localhost
- DB_USER=your_user    (normalmente es root)
- DB_PASSWORD=your_password  (si no hay contraseña se deja vacio)
- DB_NAME=task_manager
- DB_PORT=3306          (port de base de datos)
- PORT=3000

---

## Arquitectura

### Backend (MVC + Services)
- Request → Routes → Controllers → Services → Database

| Capa | Archivo | Responsabilidad |
|------|---------|-----------------|
| Routes | backend/src/routes/task.routes.js | Define los endpoints REST |
| Controllers | backend/src/controllers/task.controller.js | Maneja las peticiones HTTP |
| Services | backend/src/services/task.service.js | Lógica de negocio y operaciones DB |
| Config | backend/src/config/db.js | Pool de conexión MySQL con promise wrapper |


### Frontend (Standalone Components)
- Angular 21 usa standalone components (sin NgModule):

| Componente | Archivo | Responsabilidad |
|------------|---------|-----------------|
| TasksComponent | frontend/src/app/pages/tasks/tasks.ts | Estado, carga de datos y diálogos |
| TaskDialogComponent | frontend/src/app/pages/tasks/task-dialog/task-dialog.ts | Formularios de crear/editar |
| TaskService | frontend/src/app/services/task.ts | Comunicación con el API del backend |
| Routing | frontend/src/app/app.routes.ts | Navegación (/, /tasks, /public-api) |

---

## API Endpoints
- Base URL: http://localhost:3000/api

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/tasks | Obtener todas las tareas |
| GET | /api/tasks/:id | Obtener una tarea por ID |
| POST | /api/tasks | Crear una tarea |
| PUT | /api/tasks/:id | Actualizar una tarea |
| DELETE | /api/tasks/:id | Eliminar una tarea |
---

## Patrones clave

### Inyección de dependencias
- El frontend usa la función moderna inject() de Angular:
- typescript
- private taskService = inject(TaskService);
- private dialog = inject(MatDialog);
- 
---

### Conexión a la base de datos
- El backend usa mysql2 con promise wrapper para async/await:
- javascript
- const db = mysql.createPool({...});
- module.exports = db.promise();
- 
---

### CORS
El backend habilita CORS en backend/src/app.js para permitir conexiones del frontend.

---

### Manejo de errores
Los controllers usan bloques try-catch con códigos HTTP apropiados:
- 400 — validación fallida
- 404 — recurso no encontrado
- 500 — error del servidor

---

## Notas importantes
- El backend usa *CommonJS* (require/module.exports), no ES modules
- El frontend usa *standalone components* — no se necesita NgModule
- Las consultas usan *prepared statements* para prevenir SQL injection
- Los valores de estado deben coincidir con el enum: 'pendiente', 'en progreso', 'completada'
- El proyecto incluye una página demo de Public API que consume JSONPlaceholder
---
