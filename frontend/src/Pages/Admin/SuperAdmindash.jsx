import React, { useState, useEffect } from 'react';
import { FaUsers, FaChartLine, FaCogs, FaSignOutAlt } from 'react-icons/fa';
import { authcontext } from '../../../context/authcontext.jsx';
import { useContext } from 'react';

import { fetchSuperAdminStats } from "../../services/dashboardService";
import { createAdmin, getAdmins, getAllUsers, promoteUser, createOutlet, getAllOutlets } from "../../services/adminService";
import { toast, ToastContainer } from "react-toastify";
import "./SuperAdmindash.css";

const SuperAdmindash = () => {
  const [active, setActive] = useState('overview');
  const { logout } = useContext(authcontext);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeAdmins: 0,
    systemHealth: "Checking..."
  });
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    firstname: '', lastname: '', username: '', email: '', password: '', contactNumber: '', street: '', city: ''
  });
  const [newOutlet, setNewOutlet] = useState({
    name: '', location: '', city: '', state: '', password: '', adminId: ''
  });

  const handleLogout = () => {
    logout(() => {
      window.location.href = '/';
    });
  };

  useEffect(() => {
    document.title = 'Super Admin - VayuGas';
    const loadStats = async () => {
      try {
        const data = await fetchSuperAdminStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to load superadmin stats", error);
      }
    };
    const loadAdmins = async () => {
      try {
        const data = await getAdmins();
        setAdmins(data);
      } catch (error) {
        console.error("Failed to load admins", error);
      }
    };
    const loadUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to load users", error);
      }
    };
    const loadOutlets = async () => {
      try {
        const data = await getAllOutlets();
        setOutlets(data);
      } catch (error) {
        console.error("Failed to load outlets", error);
      }
    };

    if (active === 'overview') {
      loadStats();
    }
    if (active === 'organizations') {
      loadAdmins();
    }
    if (active === 'users') {
      loadUsers();
    }
    if (active === 'outlets') {
      loadOutlets();
    }
  }, [active]);

  const handleInputChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const handleOutletInputChange = (e) => {
    setNewOutlet({ ...newOutlet, [e.target.name]: e.target.value });
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      await createAdmin(newAdmin);
      toast.success("Organization Admin Created Successfully");
      setNewAdmin({ firstname: '', lastname: '', username: '', email: '', password: '', contactNumber: '', street: '', city: '' });
      const data = await getAdmins();
      setAdmins(data);
    } catch (error) {
      toast.error("Failed to create admin");
    }
  };

  const handleCreateOutlet = async (e) => {
    e.preventDefault();
    try {
      await createOutlet(newOutlet);
      toast.success("Outlet Created Successfully");
      setNewOutlet({ name: '', location: '', city: '', state: '', password: '', adminId: '' });
      const data = await getAllOutlets();
      setOutlets(data);
    } catch (error) {
      toast.error("Failed to create outlet");
    }
  };

  const handlePromoteUser = async (username, newRole) => {
    try {
      await promoteUser(username, newRole);
      toast.success(`User ${username} promoted to ${newRole}`);
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to promote user");
    }
  };

  return (
    <div className="super-admin-dashboard">
      <ToastContainer />
      <aside className="super-admin-sidebar">
        <div>
          <div className="sidebar-header">
            <img src="/logo.png" alt="VayuGas" className="sidebar-logo" />
            <span className="sidebar-title">SuperAdmin</span>
          </div>

          <nav className="sidebar-nav">
            <ul className="nav-list">
              <li className={`nav-item ${active === 'overview' ? 'active' : ''}`} onClick={() => setActive('overview')}> <FaChartLine className="nav-icon" /> Overview</li>
              <li className={`nav-item ${active === 'users' ? 'active' : ''}`} onClick={() => setActive('users')}> <FaUsers className="nav-icon" /> Manage Users</li>
              <li className={`nav-item ${active === 'outlets' ? 'active' : ''}`} onClick={() => setActive('outlets')}> <FaCogs className="nav-icon" /> Manage Outlets</li>
              <li className={`nav-item ${active === 'system' ? 'active' : ''}`} onClick={() => setActive('system')}> <FaCogs className="nav-icon" /> System Settings</li>
            </ul>
          </nav>
        </div>

        <div>
          <div className="sidebar-footer">
            <button onClick={handleLogout} className="logout-btn">
              <FaSignOutAlt className="nav-icon" /> Logout
            </button>
          </div>
        </div>
        </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1 className="header-title">Super Admin Console</h1>
          <p className="header-subtitle">Global controls and overview for the entire platform.</p>
        </header>

        <section className="dashboard-content">
          {active === 'overview' && (
            <div className="stats-grid">
              <div className="stat-card"> <h3 className="stat-title">Total Users</h3> <p className="stat-value">{stats.totalUsers}</p> </div>
              <div className="stat-card"> <h3 className="stat-title">Active Admins</h3> <p className="stat-value">{stats.activeAdmins}</p> </div>
              <div className="stat-card"> <h3 className="stat-title">System Health</h3> <p className="stat-value">{stats.systemHealth}</p> </div>
            </div>
          )}

          {active === 'organizations' && (
            <div className="content-card">
              <h3 className="section-title">Manage Organizations (Admins) ({admins.length})</h3>


              <form onSubmit={handleCreateAdmin} className="admin-form">
                <input type="text" name="firstname" placeholder="First Name" value={newAdmin.firstname} onChange={handleInputChange} className="form-input" required />
                <input type="text" name="lastname" placeholder="Last Name" value={newAdmin.lastname} onChange={handleInputChange} className="form-input" required />
                <input type="text" name="username" placeholder="Username (Org Name)" value={newAdmin.username} onChange={handleInputChange} className="form-input" required />
                <input type="email" name="email" placeholder="Email" value={newAdmin.email} onChange={handleInputChange} className="form-input" required />
                <input type="password" name="password" placeholder="Password" value={newAdmin.password} onChange={handleInputChange} className="form-input" required />
                <input type="text" name="contactNumber" placeholder="Contact Number" value={newAdmin.contactNumber} onChange={handleInputChange} className="form-input" required />
                <input type="text" name="street" placeholder="Street" value={newAdmin.street} onChange={handleInputChange} className="form-input" required />
                <input type="text" name="city" placeholder="City" value={newAdmin.city} onChange={handleInputChange} className="form-input" required />
                <button type="submit" className="submit-btn">Create Admin</button>
              </form>

              <h4 className="section-subtitle">Existing Organizations</h4>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Org Name (Username)</th>
                      <th>Email</th>
                      <th>City</th>
                      <th>Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map(admin => (
                      <tr key={admin._id}>
                        <td>{admin.username}</td>
                        <td>{admin.email}</td>
                        <td>{admin.city}</td>
                        <td>{admin.contactNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {active === 'users' && (
            <div className="content-card">
              <h3 className="section-title">Manage Users ({users.length})</h3>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          {user.role !== 'superadmin' && (
                            <div className="action-buttons">
                              <button onClick={() => handlePromoteUser(user.username, 'admin')} className="action-btn promote-btn">Promote to Admin</button>
                              <button onClick={() => handlePromoteUser(user.username, 'user')} className="action-btn demote-btn">Demote to User</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {active === 'outlets' && (
            <div className="content-card">
              <h3 className="section-title">Manage Outlets ({outlets.length})</h3>

              <form onSubmit={handleCreateOutlet} className="admin-form">
                <input type="text" name="name" placeholder="Outlet Name" value={newOutlet.name} onChange={handleOutletInputChange} className="form-input" required />
                <input type="text" name="location" placeholder="Location" value={newOutlet.location} onChange={handleOutletInputChange} className="form-input" required />
                <input type="text" name="city" placeholder="City" value={newOutlet.city} onChange={handleOutletInputChange} className="form-input" required />
                <input type="text" name="state" placeholder="State" value={newOutlet.state} onChange={handleOutletInputChange} className="form-input" required />
                <input type="password" name="password" placeholder="Password" value={newOutlet.password} onChange={handleOutletInputChange} className="form-input" required />
                <select name="adminId" value={newOutlet.adminId} onChange={handleOutletInputChange} className="form-input" required>
                  <option value="">Select Admin</option>
                  {users.filter(u => u.role === 'admin').map(admin => (
                    <option key={admin._id} value={admin._id}>{admin.username}</option>
                  ))}
                </select>
                <button type="submit" className="submit-btn">Create Outlet</button>
              </form>

              <h4 className="section-subtitle">Existing Outlets</h4>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Location</th>
                      <th>City</th>
                      <th>Admin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outlets.map(outlet => (
                      <tr key={outlet._id}>
                        <td>{outlet.name}</td>
                        <td>{outlet.location}</td>
                        <td>{outlet.city}</td>
                        <td>{outlet.adminId?.username || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {active === 'system' && (
            <div className="content-card">
              <h3 className="section-title">System Settings</h3>
              <p className="mt-2 text-sm text-gray-600">Global configuration and feature toggles (placeholder UI).</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default SuperAdmindash;
