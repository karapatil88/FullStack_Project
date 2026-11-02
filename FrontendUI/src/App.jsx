
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Settings,
  LogOut,
  LogIn
} from 'lucide-react';
import EmployeeDetails from './Components/EmployeeDetails';
import CreateEmployee from './Components/CreateEmployee';
import EditEmployeeDetails from './Components/EditEmployeeDetails';



function Sidebar() {
  const menus = [
    // { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Employee Details', path: '/', icon: Users },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Logout', path: '/logout', icon: LogOut },
     { name: 'Login', path: '/login', icon: LogIn }
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-2xl font-bold text-blue-400 mb-8">
        Employee Portal
      </h1>

      <nav className="space-y-3">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              end={menu.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`
              }
            >
              <Icon size={20} />
              <span>{menu.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">
        Dashboard
      </h1>
      <p className="mt-3 text-gray-600">
        Welcome to Employee Management System.
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-8">
          <Routes>
            {/* <Route path="/" element={<Dashboard />} /> */}

            <Route
              path="/"
              element={<EmployeeDetails />}
            />

            <Route
              path="/createEmployee"
              element={<CreateEmployee/>}
            />

            <Route
              path="/editEmployee/:id"
              element={<EditEmployeeDetails />}
            />

            <Route
              path="/settings"
              element={<h1 className="text-3xl font-bold">Settings</h1>}
            />

            <Route
              path="/logout"
              element={<h1 className="text-3xl font-bold">Logout</h1>}
            />

            <Route
              path="/login"
              element={<h1 className="text-3xl font-bold">Login</h1>}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
