import React, { useState, useEffect, useContext } from "react";
import { FaGasPump, FaSignOutAlt, FaCreditCard, FaEnvelope, FaBell, FaUser, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { authcontext } from "../../context/authcontext.jsx";
import { fetchUserStats } from "../services/dashboardService";
import { getUnreadCount } from "../services/notificationService";
import Card from "../Components/Card";
import StatCard from "../Components/StatCard";
import Button from "../Components/Button";
import Badge from "../Components/Badge";
import Requeststatus from "./Reqstatus";
import ProductList from "./ProductList";
import UserNotify from "./UserNotify";
import Paystatus from "./Paystatus";
import RequestGas from "./RequestGas";
import "./Userdash.css";

const Userdash = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    address: '',
    phone: '',
    email: '',
    nic: '',
  });
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingRequests: 0,
    completedOrders: 0,
  });
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const navigate = useNavigate();
  const { logout } = useContext(authcontext);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const raw = localStorage.getItem('user');
        if (raw) {
          const parsed = JSON.parse(raw);
          const user = parsed.data || parsed.user || null;
          if (user) {
            setUserData({
              name: `${user.firstname || ''} ${user.lastname || ''}`.trim(),
              username: user.username || '',
              address: user.street || '',
              phone: user.contactNumber || '',
              email: user.email || '',
              nic: user.nic || ''
            });
          }
        }

        const data = await fetchUserStats();
        setNews(data.news || []);
        setStats({
          totalOrders: data.totalOrders || 0,
          pendingRequests: data.pendingRequests || 0,
          completedOrders: data.completedOrders || 0,
        });

        // Load unread notification count
        try {
          const unreadCount = await getUnreadCount();
          setUnreadNotifications(unreadCount);
        } catch (error) {
          console.error('Failed to load notification count:', error);
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleLogout = () => {
    logout(() => {
      window.location.href = "/";
    });
  };

  const menuItems = [
    { id: "dashboard", icon: <FaGasPump />, label: "Dashboard" },
    { id: "request-status", icon: <FaBell />, label: "Request Status" },
    { id: "request-gas", icon: <FaGasPump />, label: "Request Gas" },
    { id: "notification", icon: <FaEnvelope />, label: "Notifications" },
    { id: "payment-status", icon: <FaCreditCard />, label: "Payment Status" },
  ];

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <div className="dashboard-content">
            <h1 className="dashboard-title">Welcome, {userData.name || 'User'}!</h1>
            <p className="dashboard-subtitle">Here's your gas distribution overview</p>

            <div className="stats-grid">
              <StatCard
                title="Total Orders"
                value={stats.totalOrders}
                icon={<FaGasPump />}
                color="primary"
                trend="up"
                trendValue="+12%"
              />
              <StatCard
                title="Pending Requests"
                value={stats.pendingRequests}
                icon={<FaBell />}
                color="warning"
              />
              <StatCard
                title="Completed Orders"
                value={stats.completedOrders}
                icon={<FaCreditCard />}
                color="success"
                trend="up"
                trendValue="+8%"
              />
            </div>

            <div className="news-section">
              <h2 className="section-title">Latest Updates</h2>
              {news.length > 0 ? (
                <div className="news-grid">
                  {news.map((item, index) => (
                    <Card key={index} padding="lg" hover>
                      <h3 className="news-title">{item.title}</h3>
                      <p className="news-description">{item.description}</p>
                      <Badge variant="info" size="sm">{item.date}</Badge>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card padding="lg">
                  <p className="no-news">No updates available at the moment</p>
                </Card>
              )}
            </div>

            <div className="quick-actions">
              <h2 className="section-title">Quick Actions</h2>
              <div className="actions-grid">
                <Button variant="primary" size="lg" onClick={() => setActivePage("request-gas")}>
                  <FaGasPump /> Request Gas
                </Button>
                <Button variant="outline" size="lg" onClick={() => setActivePage("request-status")}>
                  <FaBell /> View Requests
                </Button>
                <Button variant="outline" size="lg" onClick={() => setActivePage("payment-status")}>
                  <FaCreditCard /> Payment History
                </Button>
              </div>
            </div>
          </div>
        );
      case "request-status":
        return <Requeststatus />;
      case "request-gas":
        return <RequestGas />;
      case "notification":
        return <UserNotify />;
      case "payment-status":
        return <Paystatus />;
      default:
        return null;
    }
  };

  return (
    <div className="userdash">
      {/* Sidebar */}
      <aside className="userdash-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-text">VayuGas</span>
          </div>
        </div>

        <div className="sidebar-profile">
          <div className="profile-avatar">
            <FaUser />
          </div>
          <h3 className="profile-name">{userData.name || 'User'}</h3>
          <p className="profile-email">{userData.email}</p>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.id === 'notification' && unreadNotifications > 0 && (
                <Badge variant="danger" size="sm" className="nav-badge">
                  {unreadNotifications}
                </Badge>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Button variant="danger" size="sm" fullWidth onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="userdash-main">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        ) : (
          renderContent()
        )}
      </main>
    </div>
  );
};

export default Userdash;
