import React, { useState, useEffect } from 'react';
import { FaUsers, FaChartLine, FaCogs, FaSignOutAlt } from 'react-icons/fa';
import { authcontext } from '../../../context/authcontext.jsx';
import { useContext } from 'react';

import { fetchSuperAdminStats } from "../../services/dashboardService";
import { createAdmin, getAdmins, getAllUsers, promoteUser, createOutlet, getAllOutlets } from "../../services/adminService";
import { toast, ToastContainer } from "react-toastify";

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
    <div className="flex h-screen bg-gray-100">
      <ToastContainer />
      <aside className="w-64 bg-white p-6 shadow-md flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="VayuGas" className="w-12 h-12" />
            <span className="text-lg font-bold">SuperAdmin</span>
          </div>

          <nav className="mt-8">
            <ul className="space-y-4">
              <li className={`cursor-pointer ${active === 'overview' ? 'text-blue-600' : 'text-gray-600'}`} onClick={() => setActive('overview')}> <FaChartLine className="inline mr-2" /> Overview</li>
              <li className={`cursor-pointer ${active === 'users' ? 'text-blue-600' : 'text-gray-600'}`} onClick={() => setActive('users')}> <FaUsers className="inline mr-2" /> Manage Users</li>
              <li className={`cursor-pointer ${active === 'outlets' ? 'text-blue-600' : 'text-gray-600'}`} onClick={() => setActive('outlets')}> <FaCogs className="inline mr-2" /> Manage Outlets</li>
              <li className={`cursor-pointer ${active === 'system' ? 'text-blue-600' : 'text-gray-600'}`} onClick={() => setActive('system')}> <FaCogs className="inline mr-2" /> System Settings</li>
            </ul>
          </nav>
        </div>

        <div>
          <button className="flex items-center space-x-2 text-red-600 font-semibold" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 bg-gray-50">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold">Super Admin Console</h1>
          <p className="mt-1 text-sm opacity-90">Global controls and overview for the entire platform.</p>
        </div>

        <section className="mt-6">
          {active === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded shadow"> <h3 className="font-semibold">Total Users</h3> <p className="mt-2 text-3xl">{stats.totalUsers}</p> </div>
              <div className="bg-white p-6 rounded shadow"> <h3 className="font-semibold">Active Admins</h3> <p className="mt-2 text-3xl">{stats.activeAdmins}</p> </div>
              <div className="bg-white p-6 rounded shadow"> <h3 className="font-semibold">System Health</h3> <p className="mt-2 text-3xl">{stats.systemHealth}</p> </div>
            </div>
          )}

          {active === 'organizations' && (
            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold text-xl mb-4">Manage Organizations (Admins) ({admins.length})</h3>


              <form onSubmit={handleCreateAdmin} className="grid grid-cols-2 gap-4 mb-8 border-b pb-6">
                <input type="text" name="firstname" placeholder="First Name" value={newAdmin.firstname} onChange={handleInputChange} className="border p-2 rounded" required />
                <input type="text" name="lastname" placeholder="Last Name" value={newAdmin.lastname} onChange={handleInputChange} className="border p-2 rounded" required />
                <input type="text" name="username" placeholder="Username (Org Name)" value={newAdmin.username} onChange={handleInputChange} className="border p-2 rounded" required />
                <input type="email" name="email" placeholder="Email" value={newAdmin.email} onChange={handleInputChange} className="border p-2 rounded" required />
                <input type="password" name="password" placeholder="Password" value={newAdmin.password} onChange={handleInputChange} className="border p-2 rounded" required />
                <input type="text" name="contactNumber" placeholder="Contact Number" value={newAdmin.contactNumber} onChange={handleInputChange} className="border p-2 rounded" required />
                <input type="text" name="street" placeholder="Street" value={newAdmin.street} onChange={handleInputChange} className="border p-2 rounded" required />
                <input type="text" name="city" placeholder="City" value={newAdmin.city} onChange={handleInputChange} className="border p-2 rounded" required />
                <button type="submit" className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Create Admin</button>
              </form>

              <h4 className="font-semibold text-lg mb-2">Existing Organizations</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Org Name (Username)</th>
                      <th className="py-2 px-4 border-b text-left">Email</th>
                      <th className="py-2 px-4 border-b text-left">City</th>
                      <th className="py-2 px-4 border-b text-left">Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map(admin => (
                      <tr key={admin._id}>
                        <td className="py-2 px-4 border-b">{admin.username}</td>
                        <td className="py-2 px-4 border-b">{admin.email}</td>
                        <td className="py-2 px-4 border-b">{admin.city}</td>
                        <td className="py-2 px-4 border-b">{admin.contactNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {active === 'users' && (
            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold text-xl mb-4">Manage Users ({users.length})</h3>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Username</th>
                      <th className="py-2 px-4 border-b text-left">Email</th>
                      <th className="py-2 px-4 border-b text-left">Role</th>
                      <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id}>
                        <td className="py-2 px-4 border-b">{user.username}</td>
                        <td className="py-2 px-4 border-b">{user.email}</td>
                        <td className="py-2 px-4 border-b">{user.role}</td>
                        <td className="py-2 px-4 border-b">
                          {user.role !== 'superadmin' && (
                            <>
                              <button onClick={() => handlePromoteUser(user.username, 'admin')} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Promote to Admin</button>
                              <button onClick={() => handlePromoteUser(user.username, 'user')} className="bg-gray-500 text-white px-2 py-1 rounded">Demote to User</button>
                            </>
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
            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold text-xl mb-4">Manage Outlets ({outlets.length})</h3>

              <form onSubmit={handleCreateOutlet} className="grid grid-cols-2 gap-4 mb-8 border-b pb-6">
                <input type="text" name="name" placeholder="Outlet Name" value={newOutlet.name} onChange={handleOutletInputChange} className="border p-2 rounded" required />
                <input type="text" name="location" placeholder="Location" value={newOutlet.location} onChange={handleOutletInputChange} className="border p-2 rounded" required />
                <input type="text" name="city" placeholder="City" value={newOutlet.city} onChange={handleOutletInputChange} className="border p-2 rounded" required />
                <input type="text" name="state" placeholder="State" value={newOutlet.state} onChange={handleOutletInputChange} className="border p-2 rounded" required />
                <input type="password" name="password" placeholder="Password" value={newOutlet.password} onChange={handleOutletInputChange} className="border p-2 rounded" required />
                <select name="adminId" value={newOutlet.adminId} onChange={handleOutletInputChange} className="border p-2 rounded" required>
                  <option value="">Select Admin</option>
                  {users.filter(u => u.role === 'admin').map(admin => (
                    <option key={admin._id} value={admin._id}>{admin.username}</option>
                  ))}
                </select>
                <button type="submit" className="col-span-2 bg-green-600 text-white p-2 rounded hover:bg-green-700">Create Outlet</button>
              </form>

              <h4 className="font-semibold text-lg mb-2">Existing Outlets</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Name</th>
                      <th className="py-2 px-4 border-b text-left">Location</th>
                      <th className="py-2 px-4 border-b text-left">City</th>
                      <th className="py-2 px-4 border-b text-left">Admin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outlets.map(outlet => (
                      <tr key={outlet._id}>
                        <td className="py-2 px-4 border-b">{outlet.name}</td>
                        <td className="py-2 px-4 border-b">{outlet.location}</td>
                        <td className="py-2 px-4 border-b">{outlet.city}</td>
                        <td className="py-2 px-4 border-b">{outlet.adminId?.username || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {active === 'system' && (
            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold">System Settings</h3>
              <p className="mt-2 text-sm text-gray-600">Global configuration and feature toggles (placeholder UI).</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default SuperAdmindash;
