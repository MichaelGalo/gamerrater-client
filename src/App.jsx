import { Route, Routes } from 'react-router-dom'
import './App.css'
import { ApplicationsViews } from './components/routes/ApplicationViews'
import { Authorized } from './components/routes/Authorized'
import { Login } from './components/auth/Login'
import { Register } from './components/auth/Register'

export const App = () => {

  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            <Authorized>
              <ApplicationsViews />
            </Authorized>
          }
        />
      </Routes>
  )
}