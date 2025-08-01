import { useState,useContext,useEffect,useRef} from 'react'
import { Routes, Route,Navigate,Link,useNavigate} from 'react-router-dom';
import './css/index.css'
import './css/App.css'
import menu from '/src/assets/hamburger_menu.png'
import logo from '/src/assets/Logo.png'
import footer_logo from '/src/assets/favicon.png'
import basket from '/src/assets/Basket.png'
import restaurant from '/src/assets/restaurant.jpg'
import restaurant_food from '/src/assets/restaurant_food.jpg'
import mario_adrian_A from '/src/assets/Mario and Adrian A.jpg'
import credit_card from '/src/assets/creditcard.png'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Header(props){
  return (<>
  <header>
    <nav id="header-nav">
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
    e.preventDefault();
    if(isFormValid() &  e.target.checkValidity()){
      console.log("Reservation submitted:", { date, time, guests, occasion });
      navigate("/reserve/customerdetails");
    }
    
  }
  const isTableAvailable = () => {
    // Placeholder logic for table availability
    return true;
  }
  return (<>
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
        <button id="reservation-btn"type="submit" disabled={!isFormValid()}>Reserve Table</button>
      </form>
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
  e.preventDefault();
  if(isFormFilled() && e.target.checkValidity()){
    console.log("Customer Details submitted:", details);
    navigate("/reserve/payment");
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
    <button id="details-btn" type="submit" disabled={!isFormFilled()}>Continue To Payment</button>
  </form>
  </>)
} 
function Payment(props) {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    confirmationPreference: ''
  });
  const [touched,setTouched]=useState({
    cardNumber: false,
    cardName: false,
    expiryDate: false,
    cvv: false,
    confirmationPreference: false
  })
  const isFormFilled = () => {
  return (
    paymentDetails.cardNumber.trim() !== '' &&
    paymentDetails.cardName.trim() !== '' &&
    paymentDetails.expiryDate.trim() !== '' &&
    paymentDetails.cvv.trim() !== '' &&
    paymentDetails.confirmationPreference.trim() !== ''
  );
};
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    console.log(name,value)
    setPaymentDetails(prev => ({
      ...prev,
      [name]:value
    }));
    setTouched({...touched,[name]:true})
   
  };
  const handleSubmit = (e) => {
  e.preventDefault();
    if (e.target.checkValidity()){
      console.log("Payment Confirmed", paymentDetails);
      navigate("/reserve/confirmation");
    }

  };

  return (
    <div id="payment-page">
      <form id="payment-form" onSubmit={handleSubmit}>
        <div className='form-header'>
          <h2>Payment Details</h2>
          <p>Please add your payment method.</p>
        </div>

        <div className="payment-input">
          <label htmlFor="card-number"><sup>*</sup>Card Number</label>
          <input type="text" id="card-number" name="cardNumber" placeholder="xxxx-xxxx-xxxx-xxxx" required 
            pattern="\d{4}([\s\-_]?\d{4}){3}"
            title="Enter a 16-digit card number"
            value={paymentDetails.cardNumber}
            onChange={handleChange}
            onBlur={e =>(setTouched({...touched,[e.target.name]:true}))}
          />
          <div className="payment-error" id="card-error" aria-live="polite">
            {touched.cardNumber && paymentDetails.cardNumber.length===0 && <span className="error">Please enter a valid card number</span>}
          </div>
        </div>

        <div className="payment-input">
          <label htmlFor="card-name"><sup>*</sup>Name on Card</label>
          <input type="text" id="card-name" name="cardName" placeholder="Name on Card" required title="Enter the name as it appears on your card"
            value={paymentDetails.cardName}
            onChange={handleChange}
            onBlur={e =>(setTouched({...touched,[e.target.name]:true}))}
          />
          <div className="payment-error" id="name-error" aria-live="polite">
            {touched.cardName && paymentDetails.cardName.length===0 && <span className="error">Please enter the name on your card</span>}
          </div>
        </div>

        <div className="payment-input-row">
          <div className="payment-input">
            <label htmlFor="expiry-date"><sup>*</sup>Exp. Date</label>
            <input type="text"id="expiry-date" name="expiryDate"placeholder="MM/YY" required pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
              title="Enter the card expiry date in MM/YY format"
              value={paymentDetails.expiryDate}
              onChange={handleChange}
              onBlur={e =>(setTouched({...touched,[e.target.name]:true}))}
            />
            <div className="payment-error" id="expiry-error" aria-live="polite">
              {touched.expiryDate && paymentDetails.expiryDate.length===0 && <span className="error">Please enter a valid expiry date</span>}
            </div>
          </div>

          <div className="payment-input">
            <label htmlFor="cvv"><sup>*</sup>CVV</label>
            <input type="text" id="cvv" name="cvv" placeholder="xxx" required pattern="\d{3}"
              title="Enter the 3-digit CVV code"
              value={paymentDetails.cvv}
              onChange={handleChange}
              onBlur={e =>(setTouched({...touched,[e.target.name]:true}))}
            />
            <div className="payment-error" id="cvv-error" aria-live="polite">
              {touched.cvv && paymentDetails.cvv.length===0 &&<span className="error">Please enter a valid CVV</span>}
            </div>
          </div>

          <div className="payment-input">
            <label style={{ visibility: "hidden" }}>Hidden Text</label>
            <img src={credit_card} id="credit-logo" alt="Credit Card Icon" />
          </div>
        </div>

        <div className="payment-confirmation">
          <label htmlFor="email">Send me a Confirmation Via Email</label>
          <input type="radio" id="email" name="confirmationPreference" value="email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="payment-confirmation">
          <label htmlFor="phone">Send me a Confirmation Via Text</label>
          <input type="radio" id="phone" name="confirmationPreference" value="text"
            onChange={handleChange}
            required
          />
        </div>
        <button id="payment-btn" type="submit" disabled={!isFormFilled()}>Confirm Payment</button>
      </form>
    </div>
  );
}

function Confirmation(props){
  const navigate = useNavigate()
  return (<>
  <div id="confirmation-page">
  <h2>Reservation Confirmed!</h2>
  <span>Thank you for choosing Little Lemon. We look forward to serving you!</span>
  <button onClick={() => navigate('/reserve')}>Home</button>
  </div>
  </>)
}
function Footer(props){
  return (<>
  <footer id="footer-content">
    <img src={footer_logo} alt="Little Lemon Logo" className="footer-logo"/>
    <div className="footer-links">
      <ul>
        <li><a href="#">Home</a></li>
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
  const [count, setCount] = useState(0)
return (<>
  <div className="layout">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/reserve" />} />
          <Route path="/reserve" element={<ReserveATable />} />
          <Route path="/reserve/customerdetails" element={<CustomerDetails />} />
          <Route path="/reserve/payment" element={<Payment/>} />
          <Route path="/reserve/confirmation" element={<Confirmation />} />
        </Routes>
      </main>
      <Footer />
    </div>
</>)
}

export default App
