import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import MemberDashboard from "./pages/MemberDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/member-dashboard" element={<MemberDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}