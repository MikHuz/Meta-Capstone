import { useState,useContext,useEffect,useRef} from 'react'
import { Routes, Route,Navigate,Link,useNavigate,useLocation} from 'react-router-dom';
import { CustomerContext } from '../CustomerContext';
import { CustomerProvider } from '../CustomerContext'; 
import restaurant from '/src/assets/restaurant.jpg'
import restaurant_food from '/src/assets/restaurant_food.jpg'
import mario_adrian_A from '/src/assets/Mario and Adrian A.jpg'

export default function ReserveATable(props){
  const { customerDetails, updateTable} = useContext(CustomerContext);
  const { table } = customerDetails;
  console.log("TABLE:", table);
  const [date, setDate] = useState(table.date !== '' ? table.date : '');
  const [time, setTime] = useState(table.time !== '' ? table.time : '');
  const [guests, setGuests] = useState(table.guests !== '' ? table.guests : 1);
  const [occasion, setOccasion] = useState(table.occasion !== '' ? table.occasion : '');
  const [seatingPreference, setSeatingPreference] = useState(table.seatingPreference !== '' ? table.seatingPreference : '');
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
      updateTable({date,time,guests,occasion,seatingPreference})
      navigate("/reserve/customerdetails", {state:{date:date,time:time,guests:guests}});
    }
  }
  const isTableAvailable = () => {
    // Placeholder logic for table availability
    return true;
  }
  return (<>
      <form className="table-selection-form" onSubmit={handleSubmit} method="GET" aria-labelledby="table-header">
        <h2 id="table-header">Reserve-A-Table</h2>
          <img id="img1" src={restaurant} alt="Interior of Little Lemon restaurant" />
          <img id="img2" src={mario_adrian_A} alt="Mario and Adrian, owners of Little Lemon" />
        <div className='form-box date-box'>
          <label htmlFor="date">Select Date</label>
          <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)}required />
        </div>
   
        <div className='form-box time-box'>
          <label htmlFor="time">Select Time(9AM-8PM)</label>
          <input type="time" id="time" name="time" value={time} step="1800" min="09:00" max="20:00"
          onChange={(e) => setTime(e.target.value)}  onInvalid={e => alert("Please select a valid time in 30-minute intervals from 9 AM to 8 PM")}required/>
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
         <fieldset className='form-box preference-box' style={{borderRadius:"16pt",border:"2px solid black", borderColor:"black"}}>
          <legend className="call-to-attention" style={{color:"#EDEFEE"}}>Seating Preference</legend>
          <label htmlFor="indoor">
            <input
              type="radio"
              id="indoor"
              name="seating-preference"
              value="indoor"
              checked={seatingPreference === 'indoor'}
              onChange={(e) => setSeatingPreference(e.target.value)}
              required
            />
            Indoor
          </label>
          <label htmlFor="outdoor">
            <input
              type="radio"
              id="outdoor"
              name="seating-preference"
              value="outdoor"
              checked={seatingPreference === 'outdoor'}
              onChange={(e) => setSeatingPreference(e.target.value)}
              required
            />
            Outdoor
          </label>
        </fieldset>
        <div className='table-availability-box'  aria-atomic="true" aria-live="Assertive" role="status">
          {(isFormValid() && isTableAvailable()) ? <h3>Available!</h3>:<h3>No Tables Available</h3>}
        </div>
        <button id="reservation-btn"type="submit" disabled={!isFormValid()}>Select Table</button>
      </form>
  </>)
}