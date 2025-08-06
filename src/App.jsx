import { useState,useContext,useEffect,useRef} from 'react'
import { Routes, Route,Navigate,Link,useNavigate,useLocation} from 'react-router-dom';
import { CustomerContext } from './CustomerContext';
import { CustomerProvider } from './CustomerContext'; 
import  ReserveATable from './components/ReserveATable.jsx'
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

function CustomerDetails(props) {
  const location = useLocation();
  const {customerDetails,updateDetails} = useContext(CustomerContext)
  const userDetails = customerDetails.details;
  const [details, setDetails] = useState(userDetails !== '' ? userDetails:
    {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    requests: ''
  });
  const { date, time, guests } = customerDetails.table;
  console.log("This IS FROM CONTEXT OR NOT: ",details)

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    requests: false
  });

  const navigate = useNavigate();

  const isFormFilled = () => {
    return (
      details.firstName.length > 0 &&
      details.lastName.length > 0 &&
      details.email.length > 0 &&
      details.phone.length > 0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormFilled() && e.target.checkValidity()) {
      updateDetails(details)
      console.log("Customer Details submitted:", details);
      navigate("/reserve/payment");
    }
  };

  return (
    <>
      <form
        className="customer-details-form"
        onSubmit={handleSubmit}
        aria-labelledby="form-heading"
        aria-describedby="reserve-reminder-message"
      >
        <div className="form-header">
          <h2 id="form-heading">Customer Details</h2>
          <p id="reserve-reminder-message">
            Please provide your details to confirm the reservation at <span>{date}</span>, <span>{time}</span>, for <span>{guests}</span> guests.
          </p>
        </div>

        <div className="form-box">
          <label htmlFor="firstName" className="call-to-attention">
            <sup>*</sup>First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="John"
            value={details.firstName}
            required
            aria-describedby={touched.firstName && details.firstName.length === 0 ? "firstNameError" : undefined}
            onChange={(e) =>setDetails({ ...details, [e.target.name]: e.target.value })}
            onBlur={(e) =>setTouched({ ...touched, [e.target.name]: true })}
          />
          {touched.firstName && details.firstName.length === 0 && ( <span className="error" id="firstNameError">First Name is required</span>)}
        </div>

        <div className="form-box">
          <label htmlFor="lastName" className="call-to-attention">
            <sup>*</sup>Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Smith"
            value={details.lastName}
            required
            aria-describedby={touched.lastName && details.lastName.length === 0 ? "lastNameError" : undefined}
            onChange={(e) =>setDetails({ ...details, [e.target.name]: e.target.value })}
            onBlur={(e) =>setTouched({ ...touched, [e.target.name]: true })}
          />
          {touched.lastName && details.lastName.length === 0 && (
            <span className="error" id="lastNameError">
              Last Name is required
            </span>
          )}
        </div>

        <div className="form-box">
          <label htmlFor="email" className="call-to-attention">
            <sup>*</sup>Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={details.email}
            placeholder="email@example.com"
            required
            aria-describedby={touched.email && details.email.length === 0 ? "emailError" : undefined}
            onChange={(e) =>
              setDetails({ ...details, [e.target.name]: e.target.value })
            }
            onBlur={(e) =>
              setTouched({ ...touched, [e.target.name]: true })
            }
          />
          {touched.email && details.email.length === 0 && (
            <span className="error" id="emailError">
              Email is Required
            </span>
          )}
        </div>

        <div className="form-box">
          <label htmlFor="phone" className="call-to-attention">
            <sup>*</sup>Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={details.phone}
            placeholder="123-456-7890"
            pattern="\d{3}-\d{3}-\d{4}"
            required
            aria-describedby={touched.phone && details.phone.length === 0 ? "phoneError" : undefined}
            onChange={(e) =>
              setDetails({ ...details, [e.target.name]: e.target.value })
            }
            onBlur={(e) =>
              setTouched({ ...touched, [e.target.name]: true })
            }
          />
          {touched.phone && details.phone.length === 0 && (
            <span className="error" id="phoneError">
              Phone is Required
            </span>
          )}
        </div>

        <div className="form-box">
          <label htmlFor="requests">Special Requests</label>
          <textarea
            id="requests"
            name="requests"
            value={details.requests}
            placeholder="(Optional)"
            aria-label="Special requests or additional notes"
            onChange={(e) =>
              setDetails({ ...details, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className='buttons'>
          <button id="back-btn" type="button" onClick={() => navigate("/reserve")}>
            Back
          </button>
          <button id="details-btn" type="submit" disabled={!isFormFilled()} aria-label="Continue to payment">
            Continue To Payment
          </button>
        </div>
      </form>
    </>
  );
}
function Payment(props) {
  const navigate = useNavigate();
  const { customerDetails, updatePayment,updateDetails,updateTable} = useContext(CustomerContext);
  const [paymentDetails, setPaymentDetails] = useState(customerDetails.payment);
  console.log(paymentDetails)
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
    updatePayment(paymentDetails)
   
  };
  const handleSubmit = (e) => {
  e.preventDefault();
    if (e.target.checkValidity()){
      console.log("Payment Confirmed", paymentDetails);
      updatePayment({cardNumber: '', cardName: '', expiryDate: '', cvv: '', confirmationPreference: ''});
      updateDetails({firstName: '',lastName: '',email: '',phone: '',requests: ''});
      updateTable({date: '',time: '',guests: 1, occasion: '',seatingPreference: ''});
      navigate("/reserve/confirmation");
    }

  };

  return (
<div id="payment-page">
  <form id="payment-form" onSubmit={handleSubmit} aria-labelledby="payment-header">
    <div className='form-header'>
      <h2 id="payment-header">Payment Details</h2>
      <p id="payment-desc">Please add your payment method.</p>
    </div>

    <div className="payment-input">
      <label htmlFor="card-number"><sup>*</sup>Card Number</label>
      <input
        type="text"
        id="card-number"
        name="cardNumber"
        placeholder="xxxx-xxxx-xxxx-xxxx"
        required
        pattern="\d{4}([\s\-_]?\d{4}){3}"
        title="Enter a 16-digit card number"
        aria-describedby="card-error"
        value={paymentDetails.cardNumber}
        onChange={handleChange}
        onBlur={e => setTouched({ ...touched, [e.target.name]: true })}
      />
      <div className="payment-error" id="card-error" aria-live="polite">
        {touched.cardNumber && paymentDetails.cardNumber.length === 0 && (
          <span className="error">Please enter a valid card number</span>
        )}
      </div>
    </div>

    <div className="payment-input">
      <label htmlFor="card-name"><sup>*</sup>Name on Card</label>
      <input
        type="text"
        id="card-name"
        name="cardName"
        placeholder="Name on Card"
        required
        title="Enter the name as it appears on your card"
        aria-describedby="name-error"
        value={paymentDetails.cardName}
        onChange={handleChange}
        onBlur={e => setTouched({ ...touched, [e.target.name]: true })}
      />
      <div className="payment-error" id="name-error" aria-live="polite">
        {touched.cardName && paymentDetails.cardName.length === 0 && (
          <span className="error">Please enter the name on your card</span>
        )}
      </div>
    </div>

    <div className="payment-input-row">
      <div className="payment-input">
        <label htmlFor="expiry-date"><sup>*</sup>Exp. Date</label>
        <input
          type="text"
          id="expiry-date"
          name="expiryDate"
          placeholder="MM/YY"
          required
          pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
          title="Enter the card expiry date in MM/YY format"
          aria-describedby="expiry-error"
          value={paymentDetails.expiryDate}
          onChange={handleChange}
          onBlur={e => setTouched({ ...touched, [e.target.name]: true })}
        />
        <div className="payment-error" id="expiry-error" aria-live="polite">
          {touched.expiryDate && paymentDetails.expiryDate.length === 0 && (
            <span className="error">Please enter a valid expiry date</span>)}
        </div>
      </div>

      <div className="payment-input">
        <label htmlFor="cvv"><sup>*</sup>CVV</label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          placeholder="xxx"
          required
          pattern="\d{3}"
          title="Enter the 3-digit CVV code"
          aria-describedby="cvv-error"
          value={paymentDetails.cvv}
          onChange={handleChange}
          onBlur={e => setTouched({ ...touched, [e.target.name]: true })}
        />
        <div className="payment-error" id="cvv-error" aria-live="polite">
          {touched.cvv && paymentDetails.cvv.length === 0 && (
            <span className="error">Please enter a valid CVV</span>
          )}
        </div>
      </div>

      <div className="payment-input">
        <label style={{ visibility: "hidden" }}>Hidden Text</label>
        <img
          src={credit_card}
          id="credit-logo"
          alt="Credit card icon representing secure payment"
        />
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
      <div className='buttons'>
          <button id="back-btn" type="button" onClick={() => navigate("/reserve/customerdetails")}>
            Back
          </button>
        <button id="payment-btn" type="submit" disabled={!isFormFilled()} aria-disabled={!isFormFilled()}>
          Make Reservation
        </button>
        </div>
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
  <button id="home-btn"onClick={() => navigate('/reserve')}>Home</button>
  </div>
  </>)
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
  const [count, setCount] = useState(0)
return (<>
<CustomerProvider>
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
</CustomerProvider>
</>)
}

export default App
