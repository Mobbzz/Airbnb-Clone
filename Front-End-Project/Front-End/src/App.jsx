import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Footer from './Components/Footer/Footer'
import About from './Pages/About/About'
import Support from './Pages/Support/Support'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Detail from './Pages/Detail/Detail.jsx'
import Reservations from './Pages/Reservations/Reservations'
import AccommodationProvider from './Context/AccommodationContext'
import UserProvider from './Context/UserContext'
import AddAccommodation from './Pages/AddAccommodation/AddAccommodation.jsx'



function App() {
  return (
    <BrowserRouter>
    <UserProvider>
        <AccommodationProvider>

      <Navbar />
      <div className="container">
        <Routes>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='support' element={<Support />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path="/Detail/:id" element={<Detail />} />
          <Route path='reservations' element={<Reservations />} />
          <Route path='add-accommodation' element={<AddAccommodation /> } />

          
        </Routes>
      </div>
      <Footer />
      </AccommodationProvider>
      </UserProvider>

    </BrowserRouter>
  )
}

export default App