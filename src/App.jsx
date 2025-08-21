// src/App.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import { ProductProvider } from "./context/ProductContext";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import VerifyEmail from "./pages/verify";
import Sidebar from "./components/Sidebar";
import TaskForm from "./components/TaskForm";
import CardDetail from "./pages/CardDetail";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import Products from "./pages/Products";
import Log from "./pages/Log";
import Report from "./pages/Report";
import AddProduct from "./pages/AddProduct";
import { LogProvider } from "./context/LogContext";
import TeamsPage from "./pages/TeamsPage";
import Dashboard from "./pages/Dashboard";
import TeamDashboard from "./pages/TeamDashboard";
import JoinTeam from "./pages/JoinTeam";
import TaskPool from "./pages/TaskPool";
import MyTasks from "./pages/MyTasks";
import SettingsPage from "./pages/SettingsPage";
import CreateTeam from "./pages/CreateTeam";
import ForgotPassword from "./pages/Forgotpassword";
import ResetPassword from "./pages/ResetPassowrd";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <TaskProvider>
          <LogProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/join-team" element={<JoinTeam />} />
              <Route path="/contact-us" element={<ContactUs/>}/>
              <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
              <Route path="/terms-of-service" element={<TermsOfService/>}/>


              
              <Route
                path="/panding-tasks"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <Sidebar />
                    <TaskPool />
                  </ProtectedRoute>
                }
              />

              
              <Route
                path="/my-tasks"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <Sidebar />
                    <MyTasks />
                  </ProtectedRoute>
                }
              />

              {/* ... बाकी के रूट्स */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <Sidebar />
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/addtask"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <Sidebar />
                    <TaskForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks/:id"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <Sidebar />
                    <CardDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <Sidebar />
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <Sidebar />
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-team"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <Sidebar />
                    <CreateTeam />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <Sidebar />
                    <Products />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products/:id"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <Sidebar />
                    <Products />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/addproduct"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <Sidebar />
                    <AddProduct />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/log"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <Sidebar />
                    <Log />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/report"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <Sidebar />
                    <Report />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/teams"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <Sidebar />
                    <TeamsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/team-dashboard"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <Sidebar />
                    <TeamDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </LogProvider>
        </TaskProvider>
      </ProductProvider>
    </AuthProvider>
  );
}