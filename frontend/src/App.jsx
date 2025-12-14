import {useContext, useState} from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import Header from "./Components/Header";
import PublicLayout from "./components/layouts/PublicLayout";
import About from "./Components/About";
import Footer from "./Components/Footer";
import Feature from "./Components/Feature";
import Support from "./Components/Support";
import Career from "./Components/Career";
import Blog from "./Components/Blog";
import {authcontext} from "../context/authcontext.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Lazy load components for better performance
const Login = lazy(() => import("./Pages/Login"));
const Signup = lazy(() => import("./Pages/Signup"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const SignupPage = lazy(() => import("./Pages/SignupPage"));
const UserDash = lazy(() => import("./Pages/Userdash"));
const Requeststatus = lazy(() => import("./Pages/Reqstatus"));
const ProductList = lazy(() => import("./Pages/ProductList"));
const Checkout = lazy(() => import("./Pages/Checkout"));
const UserNotify = lazy(() => import("./Pages/UserNotify"));
const Paystatus = lazy(() => import("./Pages/Paystatus"));
const Admindash = lazy(() => import("./Pages/Admin/Admindash"));
const SuperAdmindash = lazy(() => import("./Pages/Admin/SuperAdmindash"));
const Adminstock = lazy(() => import("./Pages/Admin/Adminstock"));
const Adminreport = lazy(() => import("./Pages/Admin/Adminreport"));
const AdminOutlet = lazy(() => import("./Pages/Admin/AdminOutlet"));
const AdminDelivery = lazy(() => import("./Pages/Admin/AdminDelivery"));
const OutletDashboard = lazy(() => import("./Pages/Outlet/OutletDashboard"));
const OutletStock = lazy(() => import("./Pages/Outlet/OutletStock"));
const OutletDeliveries = lazy(() => import("./Pages/Outlet/OutletDeliveries"));
const OutletPerformance = lazy(() => import("./Pages/Outlet/OutletPerformance"));
const Customer = lazy(() => import("./Pages/Outlet/Customer"));
const OutletList = lazy(() => import("./Pages/Admin/OutletList"));

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  const { showLogin, setShowLogin, showSignup, setShowSignup, isLoggedIn, setIsLoggedIn, userRole, setUserRole, isAuthChecked } = useContext(authcontext);
  // const [showLogin, setShowLogin] = useState(false);
  // const [showSignup, setShowSignup] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const [userRole, setUserRole] = useState("admin"); // Track user role

  // const [activeSection, setActiveSection] = useState("home");

  return (
    <Router>

      {showLogin && !isLoggedIn && (
        <Suspense fallback={<LoadingSpinner />}>
          <Login
            togglePopup={() => setShowLogin(false)}
          />
        </Suspense>
      )}
      {showSignup && <Suspense fallback={<LoadingSpinner />}>
        <Signup togglePopup={() => setShowSignup(false)} />
      </Suspense>}

      <Routes>
        {/* Public Layout wrapper */}
        <Route element={<PublicLayout />}> 
          {/* Redirect based on login state using imperative navigation to avoid Navigate loops */}
          <Route path="/" element={<HomeRouter Header={Header} />} />

          {/* Public Pages */}
          <Route path="/career" element={<Career />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Feature />} />
          <Route path="/support" element={<Support />} />

          {/* Auth Routes */}
          <Route path="/login" element={!isLoggedIn ? <Suspense fallback={<LoadingSpinner />}><LoginPage /></Suspense> : <Navigate to="/" />} />
          <Route path="/signup" element={!isLoggedIn ? <Suspense fallback={<LoadingSpinner />}><SignupPage /></Suspense> : <Navigate to="/" />} />

          {/* User accessible routes */}
          <Route path="/product-list" element={<Suspense fallback={<LoadingSpinner />}><ProductList /></Suspense>} />
          <Route path="/checkout/:productId" element={<Suspense fallback={<LoadingSpinner />}><Checkout /></Suspense>} />
        </Route>

        {/* Protected Routes */}
    <Route path="/user-dashboard" element={!isAuthChecked ? <LoadingSpinner /> : (isLoggedIn && userRole === "user" ? <Suspense fallback={<LoadingSpinner />}><UserDash /></Suspense> : <Navigate to="/" />)} />
  <Route path="/admin-dashboard" element={!isAuthChecked ? <LoadingSpinner /> : (isLoggedIn && userRole === "admin" ? <Suspense fallback={<LoadingSpinner />}><Admindash /></Suspense> : <Navigate to="/" />)} />
  <Route path="/superadmin-dashboard" element={!isAuthChecked ? <LoadingSpinner /> : (isLoggedIn && userRole === "superadmin" ? <Suspense fallback={<LoadingSpinner />}><SuperAdmindash /></Suspense> : <Navigate to="/" />)} />
    <Route path="/outlet-dashboard" element={!isAuthChecked ? <LoadingSpinner /> : (isLoggedIn && userRole === "outlet" ? <Suspense fallback={<LoadingSpinner />}><OutletDashboard /></Suspense> : <Navigate to="/" />)} /> {/* ✅ Fixed OutletDashboard */}

        {/* Admin Routes */}
        <Route path="/Adminstock" element={isLoggedIn && userRole === "admin" ? <Suspense fallback={<LoadingSpinner />}><Adminstock /></Suspense> : <Navigate to="/" />} /> 
        <Route path="/Adminreport" element={isLoggedIn && userRole === "admin" ? <Suspense fallback={<LoadingSpinner />}><Adminreport /></Suspense> : <Navigate to="/" />} /> 
        <Route path="/AdminOutlet" element={isLoggedIn && userRole === "admin" ? <Suspense fallback={<LoadingSpinner />}><AdminOutlet /></Suspense> : <Navigate to="/" />} />
        <Route path="/outlet-list" element={isLoggedIn && (userRole === "admin" || userRole === "outlet") ? <Suspense fallback={<LoadingSpinner />}><OutletList /></Suspense> : <Navigate to="/" />} />
        <Route path="/AdminDelivery" element={isLoggedIn && userRole === "admin" ? <Suspense fallback={<LoadingSpinner />}><AdminDelivery /></Suspense> : <Navigate to="/" />} />

        {/* Outlet Routes */}
        <Route path="/OutletStock" element={isLoggedIn && userRole === "outlet" ? <Suspense fallback={<LoadingSpinner />}><OutletStock /></Suspense> : <Navigate to="/" />} /> 
        <Route path="/OutletPerformance" element={isLoggedIn && userRole === "outlet" ? <Suspense fallback={<LoadingSpinner />}><OutletPerformance/></Suspense> : <Navigate to="/" />} />
        <Route path="/OutletDeliveries" element={isLoggedIn && userRole === "outlet" ? <Suspense fallback={<LoadingSpinner />}><OutletDeliveries /></Suspense> : <Navigate to="/" />} />
        <Route path="/Customer" element={isLoggedIn && userRole === "outlet" ? <Suspense fallback={<LoadingSpinner />}><Customer/></Suspense> : <Navigate to="/" />} />
    

        {/* User Routes */}
        <Route path="/UserNotify" element={isLoggedIn ? <Suspense fallback={<LoadingSpinner />}><UserNotify /></Suspense> : <Navigate to="/" />} />
        <Route path="/request-status" element={isLoggedIn ? <Suspense fallback={<LoadingSpinner />}><Requeststatus /></Suspense> : <Navigate to="/" />} />
        <Route path="/Paystatus" element={isLoggedIn ? <Suspense fallback={<LoadingSpinner />}><Paystatus /></Suspense> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

// HomeRouter component: shows the home page
function HomeRouter({ Header }) {
  const { isAuthChecked, isLoggedIn, userRole } = useContext(authcontext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthChecked) return; // wait until auth check finishes

    if (isLoggedIn) {
      if (userRole === "superadmin") navigate('/superadmin-dashboard');
      else if (userRole === "admin") navigate('/admin-dashboard');
      else if (userRole === "outlet") navigate('/outlet-dashboard');
      else navigate('/user-dashboard');
    }
    // if not logged in, don't navigate — let the home content render
  }, [isAuthChecked, isLoggedIn, userRole, navigate]);

  if (!isAuthChecked) return <LoadingSpinner />;
  if (isLoggedIn) return null; // navigation in progress

  return <Header />;
}

export default App;
