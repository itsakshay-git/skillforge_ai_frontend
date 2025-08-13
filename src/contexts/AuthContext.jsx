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
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
            const savedUser = localStorage.getItem('skillforge_ai_user')
            if (savedUser) {
                try {
                    setUser(JSON.parse(savedUser))
                } catch (error) {
                    console.error('Error parsing saved user data:', error)
                }
            }
            verifyToken()
        } else {
            setLoading(false)
        }
    }, [token])

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
                localStorage.removeItem('skillforge_ai_token')
                localStorage.removeItem('skillforge_ai_user')
                setToken(null)
                setUser(null)
                axiosInstance.defaults.headers.common['Authorization'] = ''
            }
        } catch (error) {
            console.error('Token verification failed:', error)
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

            if (response.data.token && response.data.user) {
                const { token: newToken, user: userData } = response.data

                setToken(newToken)
                setUser(userData)
                localStorage.setItem('skillforge_ai_token', newToken)
                localStorage.setItem('skillforge_ai_user', JSON.stringify(userData))
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`

                toast.success('Login successful! Welcome back!')

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

            if (response.data.user || response.data.message?.includes('successful')) {

                toast.success('Registration successful! Please log in to continue.')

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
            await axiosInstance.post('/auth/logout')
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            setToken(null)
            setUser(null)
            localStorage.removeItem('skillforge_ai_token')
            localStorage.removeItem('skillforge_ai_user')
            axiosInstance.defaults.headers.common['Authorization'] = ''
            
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