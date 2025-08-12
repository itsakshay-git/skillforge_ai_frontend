import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '@/lib/axios'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('skillforge_ai_token'))
    const [loading, setLoading] = useState(true)
    const [pendingRedirect, setPendingRedirect] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            // Set the token in axios headers
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`

            // Try to restore user data from localStorage first
            const savedUser = localStorage.getItem('skillforge_ai_user')
            if (savedUser) {
                try {
                    setUser(JSON.parse(savedUser))
                } catch (error) {
                    console.error('Error parsing saved user data:', error)
                }
            }

            // Verify token and get user info
            verifyToken()
        } else {
            setLoading(false)
        }
    }, [token])

    // Handle pending redirects after component mounts
    useEffect(() => {
        if (pendingRedirect && !loading) {
            navigate(pendingRedirect)
            setPendingRedirect(null)
        }
    }, [pendingRedirect, loading, navigate])

    const verifyToken = async () => {
        try {
            const response = await axiosInstance.get('/auth/profile')
            if (response.data.user) {
                setUser(response.data.user)
            } else {
                // Token is invalid, remove it
                localStorage.removeItem('skillforge_ai_token')
                localStorage.removeItem('skillforge_ai_user')
                setToken(null)
                setUser(null)
                axiosInstance.defaults.headers.common['Authorization'] = ''
            }
        } catch (error) {
            console.error('Token verification failed:', error)
            // Token is invalid, remove it
            localStorage.removeItem('skillforge_ai_token')
            localStorage.removeItem('skillforge_ai_user')
            setToken(null)
            setUser(null)
            axiosInstance.defaults.headers.common['Authorization'] = ''
        } finally {
            setLoading(false)
        }
    }

    const login = async (credentials) => {
        try {
            const { email, password } = credentials;
            const response = await axiosInstance.post('/auth/login', { email, password })

            // Check if we have a token and user data (successful login)
            if (response.data.token && response.data.user) {
                const { token: newToken, user: userData } = response.data

                setToken(newToken)
                setUser(userData)
                localStorage.setItem('skillforge_ai_token', newToken)
                localStorage.setItem('skillforge_ai_user', JSON.stringify(userData))
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`

                // Show success toast
                toast.success('Login successful! Welcome back!')

                // Set pending redirect to dashboard
                setPendingRedirect('/dashboard')

                return { success: true }
            } else {
                toast.error(response.data.error || response.data.message || 'Login failed')
                return { success: false, error: response.data.error || response.data.message }
            }
        } catch (error) {
            console.error('Login error:', error)
            const errorMessage = error.response?.data?.error || 'Login failed. Please try again.'
            toast.error(errorMessage)
            return { success: false, error: errorMessage }
        }
    }

    const register = async (credentials) => {
        try {
            const { username, email, password } = credentials;
            const response = await axiosInstance.post('/auth/register', { username, email, password })

            // Check if registration was successful (usually backend sends user data or success message)
            if (response.data.user || response.data.message?.includes('successful')) {
                // Show success toast
                toast.success('Registration successful! Please log in to continue.')

                // Set pending redirect to home
                setPendingRedirect('/')

                return { success: true }
            } else {
                toast.error(response.data.error || response.data.message || 'Registration failed')
                return { success: false, error: response.data.error || response.data.message }
            }
        } catch (error) {
            console.error('Registration error:', error)
            const errorMessage = error.response?.data?.error || 'Registration failed. Please try again.'
            toast.error(errorMessage)
            return { success: false, error: errorMessage }
        }
    }

    const logout = async () => {
        try {
            // Call logout endpoint if available
            await axiosInstance.post('/auth/logout')
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            // Clear local state regardless of API response
            setToken(null)
            setUser(null)
            localStorage.removeItem('skillforge_ai_token')
            localStorage.removeItem('skillforge_ai_user')
            axiosInstance.defaults.headers.common['Authorization'] = ''

            // Show logout toast
            toast.success('Logged out successfully')
        }
    }

    const value = {
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        register,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
} 