import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './NavBar/NavBar'
import { Routes, Route } from 'react-router-dom'
import SignIn from './Auth/SignIn'
import SellerSignIn from './Auth/sellerSignIn'
import PlaceOrder from './Componentes/Order/PlaceOrder'
import { SnackbarProvider } from 'notistack';
import SellerNavbar from './NavBar/SellerNavbar'

function App() {

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path='/Dashbord' element={<Navbar />} />
          <Route path='/sellerDasBhord' element={<SellerNavbar/>}/>
          <Route path="/oderSignIn/:id" element={<SellerSignIn />} />
          <Route path="/sellerSignIn" element={<SellerSignIn />} />
          <Route path="/placeOrder/:id" element={<PlaceOrder />} />
        </Routes>
      </SnackbarProvider>
    </>
  )
}

export default App
