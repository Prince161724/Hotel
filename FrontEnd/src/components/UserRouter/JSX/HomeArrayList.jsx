import {useState,useEffect,useRef,useContext} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import '../Css/HomeArrayListCss.css'
import {noteContext} from './NoteState/NoteState'
import { API_BASE_URL } from '../../../config';


//Fetch Function


function HomeArrayList({pages,setPages}){
  const go=useRef(false);
  console.log("Go",go);
  const Navigate=useNavigate();
  const {ArrayList,setArrayList,startpage,setStartPage,setEndPage,Endpage,favourite,setFavourite,showPersonal,setShowpersonal}=useContext(noteContext);
  const DefaultImage="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688";
  useEffect(()=>
    {
      if(localStorage.getItem('FirstDate')) localStorage.removeItem('FirstDate');
      if(localStorage.getItem('SecondDate')) localStorage.removeItem('SecondDate');
      if(localStorage.getItem('priceTotal')) localStorage.removeItem('priceTotal');
    // console.log("HomeArrayList Runs Here Runs Here");
    const fetchData= async ()=>{
      try {
        const url=`${API_BASE_URL}/user/AllHomes`;
        const response=await fetch(url,{
          method:"GET",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:"include"
        });
        
        // Check response status and content type
        if (!response.ok) {
          console.error('Failed to load homes:', response.status);
          // Server error - try to read error message if JSON
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            console.error('Server error:', errorData);
          }
          return;
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error('Expected JSON but got:', contentType);
          const text = await response.text();
          console.error('Response preview:', text.substring(0, 200));
          return;
        }
        
        const res = await response.json();
        
        if (res.error) {
          console.error('Server returned error:', res.error);
          return;
        }
        
        // Safely handle response
        const toPassinPage = Math.ceil((res.lengthOfHotels || 0) / 12);
        console.log("The Homes are ", res.Hotels);
        setPages(toPassinPage);
        setArrayList(res.Hotels || []);
      } catch (error) {
        console.error('Error fetching homes:', error);
      }
  }
  if(!localStorage.getItem('sentData')){
    // console.log("It is even running now does not matter " );
  fetchData();}
  const fetchuser=async ()=>{
    const url=`${API_BASE_URL}/user/Passname`;
  const response=await fetch(url,{
    method:"GET",
    credentials:"include"
  })
  const res=await response.json();
  setShowpersonal((prev)=>{
    const updated={...prev,user:res.user}
    console.log("updated is ",updated);
    localStorage.setItem('Username',updated.user.name);
    return updated;
  })
  }
  fetchuser();
}
  ,[]);
  useEffect(() => {
    if (showPersonal.home && go.current) {
      console.log("✅ Home set successfully:", showPersonal);
      localStorage.setItem('home',showPersonal.home._id);
      localStorage.setItem('email',showPersonal.user.email);
      Navigate("/HomePersonal");
    }
  }, [showPersonal]);
  const homeDetails=(e,home)=>{
    go.current=true;
    const {name}=e.target;
      setShowpersonal((prev)=>{
      const updated={...prev,[name]:home};
      localStorage.setItem('Owneremail',updated.home.Owner);
      localStorage.setItem('Ownername',updated.home.Ownername);
      return updated;
    })
}
return(
  <>
  <div className="ArrayList">
    {/* {console.log("We got the array list a s here in Array ",ArrayList)} */}
  {ArrayList
    .filter(home => home.Booked !== "true" || home.SecondDate=='') // Filter out booked homes FIRST
    .slice(startpage, Endpage)              // Then slice for pagination
    .map((home, index) => {
      console.log("StartPage si here ", startpage)
      return(
        <div className="card" key={index}>
          <button className="imgHome">
            <img 
              src={home.photo[0].housePhotos[0]} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/src/images/picture6.jpg'
              }}
              alt="" 
              className="card-imaged" 
            />
          </button>
          <div className="HomeName">{home.name}&nbsp;</div>
          <button name="home" onClick={(e) => { homeDetails(e, home) }}>
            Home Details
          </button>
          <div className="HomeName">
            {home.location?.[0] || ""}&nbsp;{home.location?.[1] || ""}
          </div>
          <div className="span-elements">
            <span>${home.price}</span>
            <span>Monthly</span>
          </div>
        </div>
      )
    })
  }
  </div>
  </>
)
}
export {HomeArrayList}
// export {go}




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