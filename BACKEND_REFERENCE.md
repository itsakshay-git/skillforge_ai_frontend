# 🚀 SkillForge AI Backend - Complete Setup Guide

## 📋 Project Overview
**SkillForge AI Backend** - A comprehensive AI service platform with user authentication, PostgreSQL database, and multiple AI endpoints.

## 🔧 Tech Stack
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens with bcrypt password hashing
- **File Handling**: Multer for file uploads
- **AI Integration**: OpenRouter API for AI services
- **Development**: Nodemon for auto-restart

## 🌐 Server Configuration
- **Port**: 5000
- **CORS**: Enabled for `http://localhost:5173` (Vite/React default)
- **Environment**: Uses `.env` file for configuration

## 🗄️ Database Schema (Prisma)

### Users Table
```sql
- id (auto-increment)
- username (unique, 50 chars)
- email (unique, 100 chars) 
- password_hash (255 chars)
- created_at, updated_at
```

### User Sessions Table
```sql
- id (auto-increment)
- user_id (foreign key to users)
- token_hash (JWT token)
- expires_at
- created_at
```

### AI Interactions Table
```sql
- id (auto-increment)
- user_id (foreign key to users)
- route_type (50 chars)
- input_data (text)
- output_data (text)
- metadata (JSON)
- created_at
```

## 🔐 Authentication System

### Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Features
- Password hashing with bcrypt
- JWT token generation and validation
- Session management with database storage
- Input validation middleware

## 🤖 AI Service Endpoints

### 1. Resume Optimization
- **Route**: `POST /api/resume/optimize`
- **File**: Accepts PDF/DOCX files only
- **Body**: `resume` (file), `jobText` (string)
- **Auth**: Required
- **Features**: File parsing, AI optimization, database tracking

### 2. Text Summarization
- **Route**: `POST /api/summarizer/upload/authenticated`
- **File**: Accepts TXT, PDF, DOCX files
- **Body**: `file` (file), `tone` (string)
- **Auth**: Required
- **Features**: Multi-format support, tone customization, AI tracking

### 3. Code Explanation
- **Route**: `POST /api/explain/explain`
- **Body**: `code` (string), `language` (string), `tone` (string)
- **Auth**: Required
- **Features**: Multi-language support, tone options, AI tracking

### 4. Email Assistant
- **Route**: `POST /api/email/email-assist`
- **Body**: `mode` (string), `input` (string), `tone` (string), `recipient` (string), `context` (string)
- **Auth**: Required
- **Features**: Multiple modes (write, improve, translate), tone customization, AI tracking

### 5. Code Quiz Generator
- **Route**: `POST /api/codequiz/generate`
- **Body**: `language` (string), `difficulty` (string), `topic` (string)
- **Auth**: Required
- **Features**: Multiple languages, difficulty levels, topic-based generation, AI tracking

## 📊 User Analytics & History

### Endpoints
- `GET /api/user/history` - Get user's AI interaction history
- `GET /api/user/feature-usage` - Get usage statistics by feature
- `GET /api/user/analytics/:routeType` - Get detailed analytics for specific feature

### Features
- Complete interaction tracking
- Usage statistics and analytics
- Metadata storage for detailed insights

## 📁 File Upload Configuration

### Supported Formats
- **Resume**: PDF, DOCX only
- **Summarizer**: TXT, PDF, DOCX
- **File Size**: Configurable limits
- **Storage**: Local `uploads/` directory

## 🔧 Environment Variables (.env)
```env
DATABASE_URL=postgresql://postgres:admin@localhost:5432/skillforge_ai
JWT_SECRET=your_jwt_secret_here
PORT=5000
CORS_ORIGIN=http://localhost:5173
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

## 📦 Dependencies (package.json)
```json
{
  "express": "^5.1.0",
  "@prisma/client": "^5.13.0",
  "prisma": "^5.13.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "multer": "^2.0.2",
  "cors": "^2.8.5",
  "dotenv": "^17.2.1",
  "nodemon": "^3.1.10"
}
```

## 🚀 Available Scripts
```bash
npm start          # Start development server
npm run db:init    # Initialize database
npm run db:test    # Test database connection
npm run db:push    # Push schema to database
npm run db:generate # Generate Prisma client
npm run db:studio  # Open Prisma Studio
```

## 🔌 Database Connection
- **Host**: localhost
- **Port**: 5432
- **Database**: skillforge_ai
- **Username**: postgres
- **Password**: admin
- **Connection Pool**: 25 connections

## 🔄 API Response Format

### Success Response
```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

## 🔒 Security Features
- JWT token authentication
- Password hashing with bcrypt
- Input validation middleware
- CORS protection
- Session management
- File type validation

## 📈 AI Interaction Tracking
Every AI service call is automatically tracked with:
- User ID
- Route type
- Input data
- Output data
- Metadata (file type, tone, language, etc.)
- Timestamp

## 🌐 CORS Configuration
```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
```

## 📝 Request/Response Examples

### User Registration
```javascript
// Request
POST /api/auth/register
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}

// Response
{
  "success": true,
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "created_at": "2024-01-15T10:30:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### File Upload (Summarizer)
```javascript
// Request
POST /api/summarizer/upload/authenticated
Content-Type: multipart/form-data
Authorization: Bearer <token>

FormData:
- file: <file>
- tone: "professional"

// Response
{
  "summary": "Generated summary text...",
  "metadata": {
    "fileType": "text/plain",
    "tone": "professional",
    "contentLength": 172,
    "summaryLength": 45
  }
}
```

### AI Service Call (Code Explanation)
```javascript
// Request
POST /api/explain/explain
Authorization: Bearer <token>

{
  "code": "function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }",
  "language": "JavaScript",
  "tone": "simple"
}

// Response
{
  "explanation": "This function calculates the nth Fibonacci number...",
  "metadata": {
    "language": "JavaScript",
    "tone": "simple",
    "codeLength": 89
  }
}
```

## 🚨 Error Handling

### Common Error Codes
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `401` - Forbidden (insufficient permissions)
- `404` - Not Found (endpoint doesn't exist)
- `500` - Internal Server Error (server issues)

### Error Response Format
```json
{
  "success": false,
  "error": "Detailed error message",
  "statusCode": 400,
  "details": {
    "field": "Specific field error"
  }
}
```

## 🔍 Testing Your Backend

### 1. Start the Server
```bash
npm start
# Server will run on http://localhost:5000
```

### 2. Test Database Connection
```bash
npm run db:test
```

### 3. Test API Endpoints
Use tools like:
- Postman
- Insomnia
- Thunder Client (VS Code)
- curl commands
- Axios in Node.js scripts

## 📚 Next Steps for Frontend Development

1. **Install HTTP Client**: `npm install axios`
2. **Create API Service Layer**: Centralized API calls
3. **Implement Authentication**: JWT token management
4. **Handle File Uploads**: FormData for file submissions
5. **Error Handling**: Consistent error handling across components
6. **Loading States**: Show loading indicators during API calls
7. **Form Validation**: Client-side validation before API calls

## 🎯 Integration Checklist

- [ ] Backend server running on port 5000
- [ ] Database connected and tables created
- [ ] CORS configured for frontend origin
- [ ] JWT_SECRET set in environment
- [ ] OPENROUTER_API_KEY configured
- [ ] All API endpoints tested and working
- [ ] File uploads functioning correctly
- [ ] Authentication flow working

---

**📌 Save this file as `BACKEND_REFERENCE.md` in your frontend repository for easy access during development!** 