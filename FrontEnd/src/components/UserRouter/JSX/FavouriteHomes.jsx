import '../Css/FavouriteHomesCss.css';
import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import useSend from './FunctionToBackend'
function FavouriteHomes(){
  const Navigate=useNavigate();
  const [favourite,setFavourite]=useState([]);
  const {RemoveHome} =useSend();
  useEffect( ()=>{
    const doAll= async()=>{
    const url="http://localhost:3000/user/personalfavourite";
    const response=await fetch(url,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include"
    })
    const res=await response.json();
    const array=res.array;
    console.log("Res that  got is ",res);
    console.log("Array that  got is ",array);
    if(JSON.stringify(array)!=JSON.stringify(favourite)){
    setFavourite(array);}
  };
  doAll();
  },[favourite]);
  const onClickGo=()=>{
    Navigate("/home");
  }
  const BookForFinalize=async (e,ida)=>{
    const url="http://localhost:3000/user/AddToBooked";
    console.log("The sent id is ",ida);
    const response=await fetch(url,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({ida}),
      credentials:"include"
    })
    const res=await response.json();
    console.log(res);
  }
  const Remove=async (e,id)=>{
    console.log(id);
    const RemoveDec=await RemoveHome(id);
    setFavourite((prev)=>{
      const updated=prev.filter((prev)=>prev.id!=id);
      return updated;
    })
    console.log(RemoveDec);
  }
  return(
    <>
      <h1>Favourite Homes</h1>
    <div className="green">
      {favourite.map((home,index)=>{
        return(
          <div className="card-green" key={index}>
          <div onClick={onClickGo}>Go To Home</div>
        <div className="oImage-div"><img src={home.image} className="oImage"/></div>
        <div className="Home-Name">{home.name}</div>
        <div className="Home-price">{home.price}</div>
        <div className="Favourite-rating">Rating 5.5</div>
        <div><button onClick={(e)=>Remove(e,home)}>Remove From favourite</button></div>
        <button className="BookForFinal" onClick={(e)=>BookForFinalize(e,home._id)}>Button For Final</button>
      </div>
      )
      })}
    </div>
    </>
  )
}

export default FavouriteHomes