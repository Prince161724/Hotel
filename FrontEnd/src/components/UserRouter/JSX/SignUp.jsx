import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import '../Css/SignUp.css'
import useBackend from './FunctionToBackend'
const SignUp=()=>{
  const Navigate=useNavigate();
  const {SignUpUsers}=useBackend();
  const [details,setDetails]=useState({
    name:"",
    email:"",
    password:"",
    cpassword:""
  });
  const onChange=(e)=>{
    setDetails({...details,[e.target.name]:e.target.value});
  }
  const onSubmit=(e)=>{
    e.preventDefault();
    SignUpUsers(details);
    Navigate("/");
  }
return(
  <>
  <div className="SignUp">
  <h1>Create An Account</h1>
  <div className="container">
  <form onSubmit={onSubmit} method="POST">
  <label htmlFor="name" id="Htmlname" className="ToStyle">Please Enter your Name</label>
  <input type="text" id="name" name="name" placeholder="Please Enter your name" onChange={onChange} value={details.name} className="ToStyle ToInput"/><br></br>
  <label htmlFor="email" className="ToStyle">Email</label>
  <input type="email" name="email" id="email"  onChange={onChange} value={details.email} className="ToStyle ToInput" placeholder="Please Enter your email"/><br></br>
  <label htmlFor="password"  className="ToStyle">Password</label>
  <input type="password" name="password" id="password" onChange={onChange} value={details.password} className="ToStyle ToInput" placeholder="Please Enter your password"/><br></br>
  <label htmlFor="cpassword" className="ToStyle">Confirm Password</label>
  <input type="password" name="cpassword" id="cpassword" placeholder="Confirm Password" onChange={onChange} value={details.cpassword} className="ToStyle ToInput"></input><br></br>
  <label htmlFor="role">Renter</label>
  <input type="radio" id="role" name="role"></input>
  <label htmlFor="role">Host</label>
  <input type="radio" id="role" name="role"></input>
  <button type="submit">Submit</button>
  </form>
  </div>
  </div>
  </>
)
}

export default SignUp