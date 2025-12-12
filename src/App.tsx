import LoginPage from './pages/LoginPage.tsx'
import AdminPage from './pages/AdminPage.tsx'
import UserPage from './pages/UserPage.tsx'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import {useUserStore} from "./stores/userStore.ts";

function App() {
const { user } = useUserStore()

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {user?.authorization === 'User' && (
          <Route path="/user" element={<UserPage />} />
        )}

        {user?.authorization === 'Admin' && (
          <Route path="/admin" element={<AdminPage />} />
        )}

        <Route
          path="*"
          element={
            user?.authorization === 'Admin' ? <Navigate to="/admin" /> :
            user?.authorization === 'User' ? <Navigate to="/user" /> :
            <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  )
}

export default App
