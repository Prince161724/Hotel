import {useState,useEffect} from 'react'
import send from './FunctionToBackend'
function User(){
  const [details,setDetails]=useState({
    city:"",
    price:7800
  });
  // const [price,setPrice]=useState(7800);

  useEffect(()=>{
    send(details);
  },[details]);
  
    const onChange=(e)=>{
      setDetails({...details,[e.target.name]:e.target.value});
    }

  return(
    <>
    <div>
      <form method="POST">
  <label htmlFor="city">City</label>
  <select id="city" name="city" onChange={onChange} value={details.city}>
    <option value="" disabled selected>Select a City</option>
    <option value="Delhi">Delhi</option>
    <option value="Mumbai">Mumbai</option>
    <option value="Jaipur">Jaipur</option>
    <option value="Lucknow">Lucknow</option>
    <option value="Bangalore">Bangalore</option>
    <option value="Pune">Pune</option>
    <option value="Hyderabad">Hyderabad</option>
    <option value="Goa">Goa</option>
    <option value="Ahmedabad">Ahmedabad</option>
    <option value="Chandigarh">Chandigarh</option>
    <option value="Kolkata">Kolkata</option>
    <option value="Shimla">Shimla</option>
    <option value="Dehradun">Dehradun</option>
    <option value="Bhopal">Bhopal</option>
    <option value="Indore">Indore</option>
    <option value="Chennai">Chennai</option>
    <option value="Surat">Surat</option>
    <option value="Mysore">Mysore</option>
    <option value="Nagpur">Nagpur</option>
    <option value="Kochi">Kochi</option>
    <option value="Udaipur">Udaipur</option>
    <option value="Patna">Patna</option>
  </select>


  {/* Range Slider   */}
  <span>Price</span>&nbsp;&nbsp;<span id="min">{details.price}</span>&nbsp;&nbsp;&nbsp;
  <input type="range" min="7800" step="500" max="50000" id="price" onInput={onChange} value={details.price} name="price" /><span id="max">50000</span>



</form>
    </div>
    </>
  )
}

export default User