import { Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import CodeExplainer from "./components/codeexplainer/CodeExplainer"
import CodeQuizForm from "./components/codequizform/CodeQuizForm"
import EmailAssistant from "./components/email/EmailAssistant"
import ResumeOptimizer from "./components/resumeoptimizer/ResumeOptimizer"
import FileUpload from "./components/summarizer/FileUpload"
import Navbar from "./components/layout/Navbar"
import Home from "./pages/layout/Home"
import "./index.css"
import Settings from './pages/settings/Settings'
import Dashboard from './pages/layout/Dashboard'

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

function AppRoutes() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
          </>
        } />
        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* Legacy routes - redirect to dashboard */}
        <Route path="/resume-optimizer" element={<Navigate to="/dashboard/resume" replace />} />
        <Route path="/summarizer" element={<Navigate to="/dashboard/summarizer" replace />} />
        <Route path="/code-explainer" element={<Navigate to="/dashboard/code-explainer" replace />} />
        <Route path="/email-assistant" element={<Navigate to="/dashboard/email" replace />} />
        <Route path="/code-quiz" element={<Navigate to="/dashboard/quiz" replace />} />
        <Route path="/settings" element={<Navigate to="/dashboard/settings" replace />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
