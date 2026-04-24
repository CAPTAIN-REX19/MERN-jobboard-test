import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import '../../styles/Dashboard.css';

const DashboardLayout = () => {
  const { user, logoutUser } = useAppContext();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const navLinks = [
    { to: '/dashboard/all-jobs', label: 'All Jobs', icon: '📋' },
    { to: '/dashboard/add-job', label: 'Add Job', icon: '➕' },
    { to: '/dashboard/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <div className="dashboard-layout">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo">JobBoard</span>
        </div>
        <nav className="sidebar-nav">
          {navLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sidebar-icon">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>
        <button className="sidebar-logout" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      {/* Main content */}
      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <button
            id="sidebar-toggle-btn"
            className="hamburger-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <div className="topbar-user">
            <span>Hello, <strong>{user?.name}</strong></span>
          </div>
        </header>
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
