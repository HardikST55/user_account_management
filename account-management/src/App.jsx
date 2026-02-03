// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Update from './Update'
import { ProtectedRoute } from './Auth'

function App() {
  return (
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