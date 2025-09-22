import {useState,useContext,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import '../Css/Login.css'
import AllofBackend from './FunctionToBackend'
import {noteContext} from './NoteState/NoteState'
function Login() {
  const {LoginCheck}=AllofBackend();
  const {loginstate}=useContext(noteContext);
  const Navigate=useNavigate();
  const [details,setDetails]=useState({
    email:"",
    password:"",
    role:""
  })
  useEffect(()=>{
    localStorage.setItem('loginstate',false);
  },[])
  const onClick=(e)=>{
      setDetails({...details,[e.target.name]:e.target.value});
    }
  const onChange=async (e)=>{
      e.preventDefault();
      console.log("Here is Login value",loginstate);
      let LoginCheckRes;
      if(details.role){
        LoginCheckRes=await LoginCheck(details,details.role);
      }
      console.log("LoginCheckRes =",LoginCheckRes);
      if(LoginCheckRes){
        Navigate("/home");
        localStorage.setItem('loginstate',true);
        loginstate.current=localStorage.getItem('loginstate');
      }
      else{
        loginstate.current=localStorage.setItem('loginstate',false);
        Navigate("/");
      }
  }
  const GoToSignUp=()=>{
    //console.log("Went to Submit");
    Navigate("/SignUp");
  }
  return (
    <>
      <div className="Whole">
        <div className="ImageHere">
        <img src="images-LoginPage/download1.jpg" alt="Image" className="ImageHereimg ImageHere1"/>
        <img src="images-LoginPage/download2.jpg" alt="Image" className="ImageHereimg ImageHere2"/>
        <img src="images-LoginPage/download3.jpg" alt="Image" className="ImageHereimg ImageHere3"/>
        </div>
        <div className="Heading">
          <h1 id="Loginheading">Login Page</h1>
          <button id="SignUp" onClick={GoToSignUp}>SignUp Or Create A New Account</button>
        </div>
        <form onSubmit={onChange} className="form" >
          <label htmlFor="email" id="label-Email">Enter Your Email Address</label>
          <input type="email" name="email" id="email" placeholder="Your Email" value={details.email} onChange={onClick}></input>
          <br></br>
          <label htmlFor="password" id="label-password">Enter Your password</label>
          <input type="password" placeholder="Password" name="password" id="password" value={details.password} onChange={onClick}></input>
          <label htmlFor="label-Landlord" id="label-Landlord" name="label-Landlord">Landlord</label>
          <input type="radio" name="role" id="Landlord" value="host" onChange={onClick} required></input>
          <label htmlFor="label-Renter" id="label-Renter" name="Renter">Renter</label>
          <input type="radio" value="user" name="role" id="label-Renter" onChange={onClick} required></input>
          <button type="submit" id="button">Submit</button>
        </form>
      </div>
    </>
  )
}

export default Login
