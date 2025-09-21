import {useState,useEffect,useRef,useContext} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import '../Css/HomeArrayListCss.css'
import {noteContext} from './NoteState/NoteState'


//Fetch Function


function HomeArrayList(){
  const Navigate=useNavigate();
  const {ArrayList,setArrayList,startpage,setStartPage,setEndPage,Endpage,favourite,setFavourite}=useContext(noteContext);
  const DefaultImage="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688";
  useEffect(()=>
    {
    console.log("HomeArrayList Runs Here Runs Here");
    const fetchData= async ()=>{
    const url="http://localhost:3000/user/AllHomes";
    const response=await fetch(url,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include"
    })
    const res=await response.json();
    ////console.log("The res That we is",res);
    setArrayList(res);
  }
  fetchData();
}
  ,[])
  const favouriteGo=async (e,home)=>{
    e.preventDefault();
    const url=`http://localhost:3000/user/FavouriteHome/${home._id}`
    const response=await fetch(url,{
      method:'GET',
      credentials:"include"
    })
    const res=await response.json();
    console.log("The user that i got ",res.home);
    setFavourite(res.home);
    Navigate("/FavouriteHome");
  }
return(
  <>
  <div className="ArrayList">
  {ArrayList.slice(startpage,Endpage).map((home,index)=>{
    return(
    <div className="card" key={index}>
        <button className="imgHome"><img src={`${home.image?home.image:DefaultImage}`} alt="" className="card-imaged" /></button>
        <div className="HomeName">{home.name}&nbsp;</div>
        <div className="HomeName">{home.location?.[0] || ""}&nbsp;{home.location?.[1] || ""}</div>
        <div className="span-elements"><span>${home.price}</span><span>Monthly,daily</span><span>Rating</span></div>
        {home.Booked=="yes" && `Booked : ${home.Booked}`}
        <button to="/About" className="Card-button" onClick={(e)=>{favouriteGo(e,home)}}>&hearts;</button>
     </div>
    )
  })}
  </div>
    
  </>
)
}
export {HomeArrayList}




//Array.slice((1,5)=>(home,index)=>{
//  }
//   
// 
// 
// 
// 
// 
// 
// 
// 
//
// 
// 