import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Navbar from "./components/layout/Navbar"
import "./index.css"


const Home = lazy(() => import("./pages/layout/Home"))
const Dashboard = lazy(() => import("./pages/layout/Dashboard"))
const Fallback = lazy(() => import("./pages/Fallback"))


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <Fallback />
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

function AppRoutes() {
  const legacyRoutes = [
    { from: "/resume-optimizer", to: "/dashboard/resume" },
    { from: "/summarizer", to: "/dashboard/summarizer" },
    { from: "/code-explainer", to: "/dashboard/code-explainer" },
    { from: "/email-assistant", to: "/dashboard/email" },
    { from: "/code-quiz", to: "/dashboard/quiz" },
    { from: "/settings", to: "/dashboard/settings" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path="/" element={ <><Navbar /> <Home /></>} />
          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          {legacyRoutes.map(({ from, to }) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
        </Routes>
      </Suspense>
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
