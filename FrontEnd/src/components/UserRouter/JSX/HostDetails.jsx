function Host(){
  return(
    <>
    <div>
    <form method="POST">
      <label htmlFor="name">Name</label>
      <input type="" id="name" name="name" placeholder="Name of The house"/><br></br><br></br><br></br>
      <label htmlFor="location">Location</label>
      <input type="text" id="location" name="location" placeholder="Location Of house"/><br></br><br></br><br></br>
      <label htmlFor="price">Price</label>
      <input type="text" id="price" name="price" placeholder="Price of the house"/><br></br><br></br><br></br>
      
      
      {/* Occupany Starts Here */}
      <label htmlFor="occupancy">Occupancy</label><br></br>
      <input type="radio" name="occupancy" id="solo" value="solo"/>
      <label htmlFor="solo">Solo</label> &nbsp;&nbsp;&nbsp;&nbsp;
      <input type="radio" id="couples" name="occupancy" value="couples"/>
      <label htmlFor="couples">Couples</label>&nbsp;&nbsp;&nbsp;
      <input type="radio" name="occupancy" id="families" value="family" />
      <label htmlFor="family">Family</label>&nbsp;&nbsp;&nbsp;
      <input type="radio" name="occupancy" id="groups" value="groups"/>
      <label htmlFor="groups">Groups</label>&nbsp;&nbsp;&nbsp;<br></br><br></br><br></br>

      {/* Pets Allowed Or Not */}
      <label htmlFor="pets-allowed">Pets-Allowed</label><br></br>
      <input type="radio" name="pets" id="no" value="no"/>
      <label htmlFor="no">No</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="radio" name="pets" id="yes" value="yes"/>
      <label htmlFor="yes">Yes</label><br></br><br></br><br></br>

      {/* Type of Property */}
      <label htmlFor="property">Type of Property</label><br></br>
      <select id="property" name="propertyType">
        <option value="" disabled select>Select Any One</option>
        <option value="apartment">Apartment</option>
        <option value="house">House</option>
        <option value="bungalow">Bungalow</option>
        <option value="penthouse">Penthouse</option>
      </select><br></br><br></br><br></br>

      {/* Comfort Here */}

      <label htmlFor="comfort">ComFort Type</label>
      <select id="comfort" name="comfort-type">
        <option value="" disabled select>Select Any One</option>
        <option value="Washing-machine">Washing machine</option>
        <option value="Wi-Fi">Wi-Fi</option>
        <option value="geyser">Geyser</option>
        <option value="Ac">Air Conditioner</option>
      </select><br></br><br></br><br></br><br></br>

      {/* Environment Rules */}
      <label htmlFor="enviroment">Enviroment</label>
      <select id="enviroment">
        <option value="" disabled select>Select One</option>
        <option value="social">Social</option>
        <option value="romantic">Romantic</option>
        <option value="nature">Nature</option>
        <option value="modern">Modern</option>
      </select><br></br><br></br><br></br><br></br>


      {/* Rules CheckBox */}
      <label htmlFor="rules">Rules</label>
      <label>
        <input type="checkbox" name="rules" value="smokingAllowed" />
        Smoking Allowed
      </label>&nbsp;&nbsp;&nbsp;&nbsp;
      <label>
        <input type="checkbox" name="rules" value="NotAllowed"/>Not Allowed
        Not Allowed
      </label>&nbsp;&nbsp;&nbsp;&nbsp;
      <label>
        <input type="checkbox" name="rules" value="PartyAllowed"/>
      Parties Allowed
      </label>&nbsp;&nbsp;&nbsp;&nbsp;
      <label ><input type="checkbox" name="rules" value="PartyNotAllowed"/>Party Not Allowed</label><br></br><br></br><br></br><br></br><br></br>

      {/* Cancellation Policy */}
      <label>Cancellation Policy</label>
      <input type="radio" name="cancellation" id="cancellation" value="no"/>&nbsp;&nbsp;&nbsp;
      <label>No Cancellation</label>&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="radio" name="cancellation" id="Allowedcancellation" value="yes"/>
      <label htmlFor="Allowedcancellation">cancellation Allowed</label><br></br><br></br><br></br>

      {/* Booking */}
      <label>Booking</label>
      <input name="booking" id="instant" type="radio" value="instant"/>
      <label htmlFor="instant">Instant</label>&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="radio" id="host-approval" name="host-approval" value="host-approval"/>
      <label htmlFor="host-approval">Host Approval</label>


    </form>
    </div>
    </>
  )
}


export default Host