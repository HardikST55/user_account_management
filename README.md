# User Account Management App

A modern web application for managing user accounts with authentication, registration, and profile update features. Built with React, React Router, and Bootstrap.

## Features

- **User Authentication** - Secure login system with email and password validation
- **User Registration** - Create new user accounts with form validation
- **Profile Management** - Update user information after authentication
- **Remember Me** - Save and auto-fill login credentials using browser localStorage
- **Protected Routes** - Redirect unauthenticated users to login page
- **Responsive Design** - Bootstrap-powered responsive UI for all devices

## Tech Stack

- **Frontend**: React 19.2.4
- **Routing**: React Router DOM 7.13.0
- **UI Framework**: Bootstrap 5.3.8
- **Build Tool**: Vite 7.2.4
- **Code Quality**: ESLint

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd account-management
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   This will install all required packages:
   - react
   - react-dom
   - react-router-dom
   - bootstrap

## How to Run

### Development Mode
Start the development server with hot module reloading:
```bash
npm run dev
```
The app will be available at `http://localhost:5173` (or the URL shown in your terminal)

### Build for Production
Create an optimized production build:
```bash
npm run build
```

### Preview Production Build
Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
account-management/
├── src/
│   ├── Auth.jsx              # Authentication context and ProtectedRoute component
│   ├── Login.jsx             # Login page with remember me functionality
│   ├── Register.jsx          # User registration page
│   ├── Update.jsx            # User profile update page (protected)
│   ├── db.js                 # Mock database/user data
│   ├── App.jsx               # Main app with route configuration
│   ├── main.jsx              # React entry point
│   ├── App.css               # App styles
│   └── index.css             # Global styles
├── index.html                # HTML entry point
├── vite.config.js            # Vite configuration
├── package.json              # Project dependencies
└── eslint.config.js          # ESLint configuration
```

## Usage

### 1. Login
- Enter your email and password on the login page
- Check "Remember me" to save credentials for next time
- Click Login to proceed

### 2. Register
- Click "Register here" link on the login page
- Fill in the registration form
- Create a new account

### 3. Update Profile
- After successful login, you'll be redirected to the update page
- Modify your user information
- Save changes

## Features in Detail

### Authentication Flow
- The app uses React Context (AuthContext) for state management
- ProtectedRoute component checks user authentication state
- Unauthenticated users are automatically redirected to login

### Remember Me
- Saves email and password to browser's localStorage when checked
- Automatically populates login form on subsequent visits
- Cleared when "Remember me" is unchecked

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint to check code quality

## Browser Support

The app works on all modern browsers that support ES6 and localStorage:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is part of the ChainTech Internship Program.

## Notes

- User data is stored in `db.js` (mock database)
- Passwords are saved in localStorage when "Remember me" is used - use only on personal/secure devices
- For production, implement proper backend authentication and secure password storage
