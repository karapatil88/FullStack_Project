# FullStack Project

An Employee CRUD application built with **React 19 + Vite** on the frontend and **ASP.NET Core 10 Web API + Entity Framework Core** on the backend, backed by SQL Server LocalDB.

## Project structure

```
FullStack_Project/
├── BackendAPI/BackendApi/   ASP.NET Core 10 Web API (project name: BackendAPI)
│   ├── Controllers/         EmployeeController - CRUD endpoints
│   ├── Data/                AppDbContext (EF Core)
│   ├── Models/              Employee entity + DTOs
│   ├── Program.cs           App startup, DI, CORS, Swagger
│   └── appsettings.json     Connection string
└── FrontendUI/              React 19 + Vite SPA
    ├── src/Components/      EmployeeDetails, CreateEmployee, EditEmployeeDetails
    ├── src/Service/         Employeeservice.js - fetch calls to the API
    └── .env                 VITE_API_URL pointing at the backend
```

## Features

- List, create, edit, and delete employees (name, email, position, salary, photo)
- Photo upload (multipart/form-data) stored in the database and returned as base64 for display
- Swagger UI for exploring/testing the API directly

## Prerequisites

| Tool | Version used | Check with |
|---|---|---|
| .NET SDK | 10.0.x | `dotnet --version` |
| Node.js | 20+ | `node --version` |
| npm | 10+ | `npm --version` |
| SQL Server LocalDB | `MSSQLLocalDB` instance | `sqllocaldb info` |

SQL Server LocalDB ships with Visual Studio / SQL Server Express LocalDB installer. The backend creates the `EmployeeDB` database automatically on first run (via `EnsureCreated`) — no manual migration step is required.

## How to run

### 1. Backend API (BackendAPI)

```bash
cd BackendAPI/BackendApi
dotnet restore
dotnet run --launch-profile https
```

- API base URL: `https://localhost:7088/api/`
- Swagger UI: `https://localhost:7088/swagger`
- Connection string lives in `BackendAPI/BackendApi/appsettings.json` (`ConnectionStrings:DefaultConnection`), defaulting to:
  `Server=(localdb)\MSSQLLocalDB;Database=EmployeeDB;Integrated Security=True;TrustServerCertificate=True;`
- CORS is pre-configured to allow the Vite dev server at `http://localhost:5173` / `https://localhost:5173`.

### 2. Frontend (FrontendUI)

In a separate terminal:

```bash
cd FrontendUI
npm install
npm run dev
```

- App URL: `http://localhost:5173`
- The frontend reads the API base URL from `FrontendUI/.env` (copy `.env.example` if `.env` doesn't exist):
  ```
  VITE_API_URL=https://localhost:7088/api/
  ```

Open `http://localhost:5173` in your browser once both processes are running — the Employee list loads from the backend, and you can create, edit, and delete employees (with photo upload) from there.

## API endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/api/Employee` | List all employees |
| GET | `/api/Employee/{id}` | Get a single employee |
| POST | `/api/Employee` | Create an employee (multipart form: `Name`, `Email`, `Position`, `Salary`, `Photo`) |
| PUT | `/api/Employee/{id}` | Update an employee (same multipart fields; `Photo` optional to keep the existing one) |
| DELETE | `/api/Employee/{id}` | Delete an employee |

## Troubleshooting

- **Backend fails to connect to the database**: confirm LocalDB is installed and running (`sqllocaldb info MSSQLLocalDB`, `sqllocaldb start MSSQLLocalDB`).
- **"Invalid column name" errors after changing the `Employee` model**: the database was created by an older schema. Drop it and let the app recreate it:
  `sqlcmd -S "(localdb)\MSSQLLocalDB" -Q "DROP DATABASE EmployeeDB"`, then restart the backend.
- **Frontend requests fail with a CORS or network error**: make sure the backend is running on `https://localhost:7088` (matching `FrontendUI/.env`) before loading the frontend.
- **Port already in use**: change the frontend port with `npm run dev -- --port 5174` (and update CORS in `Program.cs` and `VITE_API_URL` accordingly), or change the backend's `applicationUrl` in `BackendAPI/BackendApi/Properties/launchSettings.json`.
