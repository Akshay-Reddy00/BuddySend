import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import {SignUp} from './pages/SignUp'
import {SignIn} from './pages/SignIn'
import { Dashboard } from "./pages/Dashboard"
import { SendMoney } from "./pages/SendMoney"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/signin"} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transfer" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
