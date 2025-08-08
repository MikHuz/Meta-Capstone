import { useState,useContext,useEffect,useRef,useReducer} from 'react'
import { Routes, Route,Navigate,Link,useNavigate,useLocation} from 'react-router-dom';
import { CustomerContext } from './CustomerContext';
import { CustomerProvider } from './CustomerContext'; 
import  ReserveATable from './components/ReserveATable.jsx'
import CustomerDetails from './components/CustomerDetails.jsx'
import Payment from './components/Payment.jsx'
import './css/index.css'
import './css/App.css'
import menu from '/src/assets/hamburger_menu.png'
import logo from '/src/assets/Logo.png'
import footer_logo from '/src/assets/favicon.png'
import basket from '/src/assets/Basket.png'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
function Header(props){
  return (<>
  <header>
    <nav id="header-nav" role="navigation" aria-label="Primary navigation">
    <ul>
      <li><a href="" area-label="Open Main Menu"><img src={menu} alt="Hamburger Icon"/></a></li>
      <li><a href="/reserve" area-label="Go To Home Page"><img src={logo} alt="Little Lemon Logo"/></a></li>
      <li><a href="" aria-label="Your Current Menu Cart"><img src={basket} alt="Basket Icon"/></a></li>
    </ul>
    </nav>
    <div className="header-text">
      <h1>Little Lemon</h1>
      <h2>Chicago</h2>
    </div>
  </header>
  </>)
}


function Confirmation(props){
  const navigate = useNavigate()
  return (<>
  <div id="confirmation-page">
  <h2>Reservation Confirmed!</h2>
  <span>Thank you for choosing Little Lemon. We look forward to serving you!</span>
  <button id="home-btn"onClick={() => navigate('/reserve')}>Home</button>
  </div>
  </>)
}
function updateTimes(currentTimes,date){
  console.log("CurrentTime:", currentTimes, " Date passed: ", date)
  switch(date){
    case(0):
      return currentTimes+=0
      break;
    case(1):
      return currentTimes+=1
      break;
    default:
      return currentTimes+=2
      break;
  }

}
function BookingPage(){
  const initialTimes = 0;
  const [availableTimes, dispatch] = useReducer(updateTimes,initialTimes)
  return(
 <Routes>
  <Route path="/" element={<Navigate to="/reserve" />} />
  <Route path="/reserve" element={<ReserveATable availableTimes={availableTimes} updateTimes={dispatch}/>} />
  <Route path="/reserve/customerdetails" element={<CustomerDetails />} />
  <Route path="/reserve/payment" element={<Payment/>} />
  <Route path="/reserve/confirmation" element={<Confirmation />} />
 </Routes>
  )
}
function Footer(props){
  return (<>
  <footer id="footer-content">
    <img src={footer_logo} alt="Little Lemon Logo" className="footer-logo"/>
    <div className="footer-links">
      <ul>
        <li><a href="/reserve">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Login</a></li>
      </ul>
    </div>
    <div className="footer-contact">
      <div><p>Contact Us:</p></div>
      <p>Email: littlelemon@email.com</p>
      <p>Phone: (123) 456-7890</p>
      <p>Address: 123 Main St, Chicago, IL</p>
    </div>
  </footer>
  </>)
}
function App() {
return (<>
<CustomerProvider>
  <div className="layout">
      <Header />
      <main className="content">
        <BookingPage/>
      </main>
      <Footer />
    </div>
</CustomerProvider>
</>)
}

export default App
