import {useNavigate} from 'react-router-dom';

export default function Confirmation(props){
  const navigate = useNavigate()
  return (<>
  <div id="confirmation-page">
  <h2>Reservation Confirmed!</h2>
  <span>Thank you for choosing Little Lemon. We look forward to serving you!</span>
  <button id="home-btn"onClick={() => navigate('/reserve')}>Home</button>
  </div>
  </>)
}