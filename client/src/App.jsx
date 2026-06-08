import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import AppLayout from "./components/layout/AppLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Pipeline from "./pages/Pipeline";
import Proposals from "./pages/Proposals";
import Meetings from "./pages/Meetings";
import Payments from "./pages/Payments";
import Team from "./pages/Team";

function ProtectedRoute({ children }) {
  const { accessToken } = useAuthStore();
  return accessToken ? children : <Navigate to="/login" replace />;
}

function GuestRoute({ children }) {
  const { accessToken } = useAuthStore();
  return !accessToken ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
        <Route path="/" element={<GuestRoute><Landing /></GuestRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="pipeline" element={<Pipeline />} />
          <Route path="proposals" element={<Proposals />} />
          <Route path="meetings" element={<Meetings />} />
          <Route path="payments" element={<Payments />} />
          <Route path="team" element={<Team />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}