import { useState,useContext,useEffect,useRef} from 'react'
import { Routes, Route,Navigate,Link,useNavigate} from 'react-router-dom';
import './css/index.css'
import './css/App.css'
import menu from '/src/assets/hamburger_menu.png'
import logo from '/src/assets/Logo.png'
import basket from '/src/assets/Basket.png'
import restaurant from '/src/assets/restaurant.jpg'
import restaurant_food from '/src/assets/restaurant_food.jpg'
import mario_adrian_A from '/src/assets/Mario and Adrian A.jpg'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Header(props){
  return (<>
  <header>
    <nav>
    <ul>
      <li><a href=""><img src={menu}/></a></li>
      <li><a href=""><img src={logo}/></a></li>
      <li><a href=""><img src={basket}/></a></li>
    </ul>
    </nav>
    <div className="header-text">
      <h1>Little Lemon</h1>
      <h2>Chicago</h2>
    </div>
  </header>
  </>)
}
function ReserveATable(props){
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("");
  const [seatingPreference, setSeatingPreference] = useState("");
  const navigate = useNavigate();
  const isFormValid = ()=>{
    if(date && time && guests && occasion && seatingPreference){
      return true
    }
    return false
  }
  const handleSubmit = (e) =>{
    e.target.checkValidity()
    e.preventDefault();
    if(isFormValid()){
      console.log("Reservation submitted:", { date, time, guests, occasion });
      navigate("/reserve/customerdetails");
    }
    
  }
  const isTableAvailable = () => {
    // Placeholder logic for table availability
    return true;
  }
  return (<>
  <main>
      <form className="table-selection-form" onSubmit={handleSubmit} method="GET">
        <h2 id="table-header">Select-A-Table</h2>
        <img id="img1"src={restaurant} alt="Restaurant" />
        <img id="img2"src={mario_adrian_A}  alt="Mario and Adrian" />
      
        <div className='form-box date-box'>
          <label htmlFor="date">Select Date</label>
          <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)}required />
        </div>
   
        <div className='form-box time-box'>
          <label htmlFor="time">Select Time</label>
          <input type="time" id="time" name="time" value={time} onChange={(e) => setTime(e.target.value)}required/>
        </div>

        <div className='form-box guest-box'>
          <label htmlFor="guests">Number of Guests</label>
          <input type="number" id="guests" name="guests" min="1" max="20" value={guests} onChange={(e) => setGuests(e.target.value)} required />
        </div>

        <div className='form-box occasion-box'>
          <label htmlFor="occasion">Occasion</label>
          <select id="occasion" name="occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)} required>
            <option value="">Select an occasion</option>
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
            <option value="engagement">Engagement</option>
          </select>
        </div>
        <div className='form-box preference-box'>
          <span>Seating Preference</span>
          <label>Indoor
            <input type="radio" id="indoor" name="seating-preference" value="indoor" required 
                   onChange={(e)=>{setSeatingPreference(e.target.value)}}/>
          </label>
          <label>Outdoor
            <input type="radio" id="outdoor" name="seating-preference" value="outdoor" required
                   onChange={(e)=>{setSeatingPreference(e.target.value)}}/>
          </label>
        </div>
        <div className='table-availability-box'>
        {(isFormValid() && isTableAvailable()) ? <h3>Available!</h3>:<h3>No Tables</h3>}
        </div>
        <button id="reservation-btn"type="submit" disabled={!isFormValid()}><h3>Reserve Table</h3></button>
      </form>
  </main>
  </>)
}

function CustomerDetails(props){
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    requests: ''
  });
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    requests: false
  });
const navigate = useNavigate();

const isFormFilled = ()=>{
  console.log("FIlledForm?")
  return (details.firstName.length >0 && details.lastName.length >0 && details.email.length >0 && details.phone.length >0)
}
const handleSubmit = (e) =>{
  e.target.checkValidity()
  e.preventDefault();
  if(isFormFilled()){
    console.log("Customer Details submitted:", details);
    navigate("/reserve/confirmation");
  }
}
  return(<>
  <form className="customer-details-form" onSubmit={handleSubmit}>
    <div className="form-header">
      <h2>Customer Details</h2>
      <p>Please provide your details to confirm the reservation</p>
    </div>
    <div className="form-box">
    <label htmlFor="firstName" className='call-to-attention'><sup>*</sup>First Name</label>
    <input type="text" id="firstName" name="firstName" placeholder="John" value={details.firstName}required 
           onChange={(e)=> setDetails({...details, [e.target.name]:e.target.value})}
           onBlur={(e) => setTouched({...touched,[e.target.name]:true})}/>
    {touched.firstName && details.firstName.length === 0 && <span className="error">First Name is required</span>}
    </div>

    <div className="form-box">
    <label htmlFor="lastName"  className='call-to-attention'><sup>*</sup>Last Name</label>
    <input type="text" id="lastName" name="lastName" placeholder="Smith" value={details.lastName} required 
           onChange={(e)=> setDetails({...details, [e.target.name]:e.target.value})}
           onBlur={(e) => setTouched({...touched,[e.target.name]:true})}/>
    {touched.lastName && details.lastName.length === 0 && <span className="error">Last Name is required</span>}
    </div>

    <div className="form-box">
    <label htmlFor="email"  className='call-to-attention'><sup>*</sup>Email</label>
    <input type="email" id="email" name="email" placeholder="email@example.com" required 
           onChange={(e)=> setDetails({...details, [e.target.name]:e.target.value})}
           onBlur={(e) => setTouched({...touched,[e.target.name]:true})}/>
    {touched.email && details.email.length===0 && <span className="error">Email is Required</span>}
    </div>

    <div className="form-box">
    <label htmlFor="phone"  className='call-to-attention'><sup>*</sup>Phone Number</label>
    <input type="tel" id="phone" name="phone" placeholder="123-456-7890"  pattern="\d{3}-\d{3}-\d{4}" required 
           onChange={(e)=> setDetails({...details, [e.target.name]:e.target.value})}
           onBlur={(e) => setTouched({...touched,[e.target.name]:true})}/>
    {touched.phone && details.phone.length===0 && <span className="error">Phone is Required</span>}
    </div>

    <div className="form-box">
    <label htmlFor="requests" >Special Requests</label>
    <textarea id="requests" name="requests" placeholder="(Optional)"
              onChange={(e)=> setDetails({...details, [e.target.name]:e.target.value})}></textarea>
    </div>
    <button id="details-btn" type="submit" disabled={!isFormFilled()}><h3>Book Reservation</h3></button>
  </form>
  </>)
}

function Confirmation(props){
  return (<>
  <h1>Reservation Confirmed!</h1>
  </>)
}
function Footer(props){
  return (<>
  <footer>
  </footer>
  </>)
}
function App() {
  const [count, setCount] = useState(0)
return (<>
  <Header/>
  <Routes>
    <Route path="/" element={<Navigate to="/reserve"/>}/>
    <Route path="/reserve" element={<ReserveATable/>}/>
    <Route path="/reserve/customerdetails" element={<CustomerDetails/>}/>
    <Route path="/reserve/confirmation" element={<h1>Reservation Confirmed!</h1>}/>
  </Routes>
  <Footer/>
</>)
}

export default App
