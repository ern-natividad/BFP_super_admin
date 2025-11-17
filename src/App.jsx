import { Routes, Route } from 'react-router-dom'
import LogIn from './pages/log_in.jsx'
import SignUp from './pages/sign_up.jsx'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
