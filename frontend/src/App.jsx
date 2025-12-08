import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../lib/auth/AuthContext";
import ProtectedRoute from "../lib/auth/ProtectedRoute";
import Dashboard from "./dashboard/Dashboard";
import Login from "./login/Login";
import Home from "./Home";
import LoadingScreen from "./dashboard/components/create-project-form/components/LoadingScreen";
import ProjectBoard from "./pr/ProjectBoard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/pr/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pr/:projectId/loading"
            element={
              <ProtectedRoute>
                <LoadingScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pr/:projectId"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
