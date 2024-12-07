import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './NavBar/NavBar'
import { Routes,Route } from 'react-router-dom'
import SignIn from './Auth/SignIn'


function App() {

  return (
    <>
    
    <Routes>
      <Route path="/" element={<SignIn/>}/>
      <Route path='/Dashbord' element={<Navbar/>}/>
    </Routes>
    </>
  )
}

export default App
