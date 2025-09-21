import '../Css-Files/Login.css'
function Login() {

  return (
    <>
      <div className="Whole">
        <div className="ImageHere">
        <img src="images-LoginPage/download1.jpg" alt="Image" className="ImageHereimg ImageHere1"/>
        <img src="images-LoginPage/download2.jpg" alt="Image" className="ImageHereimg ImageHere2"/>
        <img src="images-LoginPage/download3.jpg" alt="Image" className="ImageHereimg ImageHere3"/>
        </div>
        <div className="Heading">
          <h1>Login Page</h1>
        </div>
        <form className="form">
          <label htmlFor="email" id="label-Email">Enter Your Email Address</label>
          <input type="email" name="Email" id="email" placeholder="Your Email"></input>
          <br></br>
          <label htmlFor="password" id="label-password">Enter Your password</label>
          <input type="password" placeholder="Password" name="password" id="password"></input>
          <label htmlFor="label-Landlord" id="label-Landlord" name="label-Landlord">Landlord</label>
          <input type="radio" value="Landlord" name="role" id="Landlord"></input>
          <label htmlFor="label-Renter" id="label-Renter" name="Renter">Renter</label>
          <input type="radio" value="Renter" name="role" id="Renter"></input>
          <button type="submit" id="button">Submit</button>
        </form>
      </div>
    </>
  )
}

export default Login
