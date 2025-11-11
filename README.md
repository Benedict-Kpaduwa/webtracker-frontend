# WebTracker Frontend - Local Development Guide

## 📖 Overview

WebTracker Frontend is a React-based analytics dashboard that provides real-time insights into visitor behavior, session tracking, and event analytics. The application connects to the WebTracker backend to display comprehensive analytics data.

## 🛠 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 16.x or higher

- **npm** or **yarn** package manager

- **WebTracker Backend** running locally (on port 5000)

- **Git** for version control

### Verify Installation

```bash

node --version    

npm --version     

git --version    

```

## 🚀 Quick Start

### 1. Clone the Repository

```bash

git clone https://github.com/Benedict-Kpaduwa/webtracker-frontend.git

cd webtracker-frontend

```

### 2. Install Dependencies

```bash

npm install

```

### 3. Environment Configuration

```bash

# Copy the environment template

cp .env.example .env

# Edit the .env file with your backend URL

nano .env  # or use your preferred editor

```

### 4. Start the Development Server

```bash

# Development mode (with hot reload)

npm run dev

# Or build for production

npm run build

npm run preview

```

### 5. Access the Application

```

Development Server: http://localhost:3000


```

## ⚙️ Environment Setup

### Required Environment Variables

Create a `.env` file in the root directory:

```env

# Backend API Configuration

VITE_BASE_URL=http://localhost:4000


```

### Example `.env` file:

```env

# For local development

VITE_BASE_URL=http://localhost:4000

# For production

# VITE_BASE_URL=https://webtracker-backend.vercel.app/

```

## 🔐 Authentication

### Default Login Credentials

The application comes with pre-configured admin access:

**Username:** `admin`  

**Password:** `password`

### Login Instructions

1\. Navigate to the login page (`/login`)

2\. Enter the credentials:

   - **Username:** `admin`

   - **Password:** `password`

3\. Click "Sign In" to access the dashboard

### Changing Credentials

To change the default credentials, update the authentication logic in:

```

src/components/Login.jsx

or

src/utils/auth.js

```

## 📊 Features

### Dashboard Overview

- **Real-time visitor statistics**

- **Session duration analytics**

- **Page view trends**

- **Geographic visitor data**

- **Device and browser breakdown**

### Visitor Tracking

- **Live visitor counter**

- **Session replay capabilities**

- **Event tracking visualization**

- **User journey mapping**

### Admin Features

- **Event management**

- **Data export functionality**

- **System health monitoring**

- **Configuration settings**

## 🗂 Project Structure

```

webtracker-frontend/

├── src/

│   ├── components/

│   │   ├── Dashboard/

│   │   ├── Charts/

│   │   ├── Tables/

│   │   └── Common/

│   ├── pages/

│   │   ├── Login.jsx

│   │   ├── Dashboard.jsx

│   │   ├── Visitors.jsx

│   │   └── Settings.jsx

│   ├── utils/

│   │   ├── api.js

│   │   ├── auth.js

│   │   └── tracking.js

│   ├── hooks/

│   │   ├── useAuth.js

│   │   └── useAnalytics.js

│   └── styles/

├── public/

├── package.json

├── vite.config.js

└── .env

```

## 🎯 Integration with Backend

### API Configuration

The frontend automatically connects to the backend using the `VITE_BASE_URL` environment variable:

```javascript


const response = await fetch(`${import.meta.env.VITE_BASE_URL}/track`, {

  method: 'POST',

  headers: { 'Content-Type': 'application/json' },

  body: JSON.stringify(trackingData)

});

```

### Tracking Implementation

The frontend includes automatic tracking for:

- **Page views**

- **Session duration**

- **User interactions**

- **Custom events**

## 🔧 Development

### Available Scripts

```bash

npm run dev          # Start development server

npm run build        # Build for production

npm run preview      # Preview production build


```

### Adding New Features

1\. **Create components** in `src/components/`

2\. **Add routes** in the main router file

3\. **Update API calls** in `src/utils/api.js`

4\. **Test with local backend**

### Styling

The project uses:

- **CSS Modules** or **Styled Components**

- **Responsive design** principles

- **Modern CSS features**

## 🌐 Deployment

### Building for Production

```bash

# Build the application

npm run build

# The build output will be in 'dist/' directory

```

### Environment-Specific Builds

Create different `.env` files for each environment:

```bash

# .env.development

VITE_BASE_URL=http://localhost:5000

# .env.production

VITE_BASE_URL=https://your-production-backend.com

```

## 🐛 Troubleshooting

### Common Issues

1\. **Backend Connection Failed**

   ```

   Error: Failed to fetch data from backend

   ```

   **Solution:**

   - Verify backend is running on port 4000

   - Check `VITE_BASE_URL` in `.env` file

   - Ensure no CORS issues

2\. **Environment Variables Not Loading**

   ```

   console.log(import.meta.env.VITE_BASE_URL) // undefined

   ```

   **Solution:**

   - Restart development server after changing `.env`

   - Ensure variable names start with `VITE_`

   - Check file is in root directory

3\. **Login Fails**

   ```

   Error: Invalid credentials

   ```

   **Solution:**

   - Use username: `admin`, password: `password`

   - Check backend authentication endpoint

   - Verify network connectivity

4\. **Port Already in Use**

   ```

   Error: Port 3000 is already in use

   ```

   **Solution:**

   ```bash

   # Use different port

   npm run dev -- --port 5000

   # Or kill process using port 3000

   npx kill-port 3000

   ```

### Debug Mode

Enable debug logging by setting:

```env

VITE_ENABLE_DEBUG=true

```

This will show:

- API request/response logs

- Tracking event details

- Authentication flow

## 📱 Browser Support

- **Chrome** 90+

- **Firefox** 88+

- **Safari** 14+

- **Edge** 90+

## 🔒 Security Notes

### Important Security Considerations

1\. **Change Default Credentials** in production

2\. **Use HTTPS** in production environments

3\. **Implement proper CORS** configuration

4\. **Add input validation** for all forms

5\. **Use environment variables** for sensitive data

### Production Checklist

- [ ] Change default admin password

- [ ] Set up proper CORS origins

- [ ] Use HTTPS endpoints

- [ ] Configure proper environment variables

- [ ] Set up monitoring and logging

- [ ] Implement proper error handling

## 🤝 Contributing

1\. Fork the repository

2\. Create a feature branch

3\. Make your changes

4\. Test with local backend

5\. Submit a pull request

### Development Workflow

```bash

# 1. Create new branch

git checkout -b feature/new-analytics-chart

# 2. Make changes and test

npm run dev

# 3. Commit changes

git add .

git commit -m "Add new analytics chart"

# 4. Push and create PR

git push origin feature/new-analytics-chart

```


**Ready to track!** 🎯

Login with username `admin` and password `password` to start monitoring your analytics dashboard.