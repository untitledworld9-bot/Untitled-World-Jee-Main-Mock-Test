# 🎯 Untitled World Mock Test Platform

A complete, production-ready AI-powered Mock Test Platform for JEE Main Examination.

## ✨ Features

- **Realistic Mock Tests** - 75 questions in NTA format
- **AI-Powered Analysis** - Performance insights and improvement tips
- **Secure Authentication** - JWT-based auth system
- **Admin Panel** - PDF upload and auto-parsing
- **Real-time Results** - Instant performance metrics
- **Mobile Responsive** - Works on all devices
- **Percentile Calculation** - Accurate JEE percentile estimation

## 🏗️ Architecture

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Axios** for API calls

### Backend
- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **MVC Architecture**

## 📋 Prerequisites

- Node.js v16+
- MongoDB Atlas account
- Git

## 🚀 Installation

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/untitled-world
JWT_SECRET=your_super_secret_jwt_key_change_in_production
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=admin@untitledworld.com
ADMIN_PASSWORD=AdminPassword123
```

Start backend:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Access at: `http://localhost:5173`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout
- `GET /api/auth/profile` - Get user profile

### Tests
- `GET /api/tests` - Get all tests
- `GET /api/tests/:testId` - Get test details
- `GET /api/tests/:testId/questions` - Get test questions

### Attempts
- `POST /api/attempts/start` - Start test attempt
- `POST /api/attempts/submit` - Submit test
- `GET /api/attempts/result/:attemptId` - Get result
- `GET /api/attempts/user/history` - Get user history

### Admin
- `POST /api/admin/test/create` - Create test
- `POST /api/admin/test/upload-pdf` - Upload PDF
- `PUT /api/admin/test/:testId` - Edit test
- `DELETE /api/admin/test/:testId` - Delete test
- `GET /api/admin/analytics` - Get analytics

## 📂 File Structure

```
Untitled-World-Jee-Main-Mock-Tests-/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── server.js
│   └── package.json
├── .env.sample
└── README.md
```

## 🔐 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token-based authentication
- ✅ Role-based access control
- ✅ File upload validation
- ✅ CORS protection
- ✅ MongoDB injection prevention
- ✅ Helmet.js security headers

## 📊 Database Schema

### Users
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'user' | 'admin',
  createdAt: Date
}
```

### Tests
```javascript
{
  name: String,
  date: Date,
  shift: 'Shift 1' | 'Shift 2',
  totalQuestions: 75,
  status: 'draft' | 'published' | 'archived',
  createdAt: Date
}
```

### Questions
```javascript
{
  testId: ObjectId,
  questionNumber: Number,
  text: String,
  options: [String],
  correctAnswer: String,
  section: 'Physics' | 'Chemistry' | 'Mathematics',
  marks: 4,
  negativeMarks: 1,
  createdAt: Date
}
```

### Attempts
```javascript
{
  userId: ObjectId,
  testId: ObjectId,
  responses: [{questionId, selectedAnswer, isMarked, isReviewed}],
  totalMarks: Number,
  percentile: Number,
  accuracy: Number,
  sectionWiseScore: {...},
  createdAt: Date
}
```

## 🌐 Deployment

### Deploy Backend (Render.com)

1. Push code to GitHub
2. Go to render.com
3. New Web Service
4. Connect GitHub repo
5. Set environment variables
6. Deploy

### Deploy Frontend (Vercel)

1. Go to vercel.com
2. Import GitHub repo
3. Set VITE_API_URL
4. Deploy

### Database (MongoDB Atlas)

1. Create cluster on MongoDB Atlas
2. Get connection string
3. Add to .env

## 📝 Sample Admin Credentials

```
Email: admin@untitledworld.com
Password: AdminPassword123
```

## 🎯 Testing Checklist

- [ ] User signup/login works
- [ ] Dashboard loads correctly
- [ ] Test interface functions properly
- [ ] Timer counts down
- [ ] Submit test works
- [ ] Results display correctly
- [ ] Admin panel accessible
- [ ] PDF upload works
- [ ] Mobile responsive

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Check connection string
- Ensure IP is whitelisted in MongoDB Atlas
- Verify username/password

### CORS Errors
- Check backend CORS configuration
- Verify FRONTEND_URL in .env

### PDF Upload Not Working
- Check file size limit (50MB max)
- Ensure PDF format is valid
- Check browser console for errors

## 📞 Support

For issues or questions, please create an issue in the repository.

## 📄 License

MIT License - feel free to use this project

## 👨‍💻 Created by

Untitled World - Educational Technology

---

**Ready to ace your JEE Mains!** 🚀