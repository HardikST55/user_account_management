// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Update from './update'
import { ProtectedRoute } from './Auth'

function App() {
  return (
    // <h1>User Account Management</h1>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/update/:id' element={
          <ProtectedRoute>
            <Update/>
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;