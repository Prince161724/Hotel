import {useContext} from 'react'
import {noteContext} from './NoteState/NoteState'

export let lengtho;

const useBackend = () => {
  const {loginstate,setLoginstate} = useContext(noteContext);
  
  const send = async (data) => {
    if(loginstate){
      const url = "http://localhost:3000/user/filters";
      const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });
      const res = await response.json();
      //console.log("Length is ", res);
      //console.log("Length is ", res.Hotels);
      const Allusers = res;
      //console.log("AllUsers are here ", Allusers);
      return Allusers;
    }
  };

  const SignUpUsers = async (data) => {
    const url = "http://localhost:3000/user/SignUp";
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const res = await response.json();
    if(res.errors) {
      res.errors.forEach(res => {
        //console.log(res.msg);
      });
    }
  };

  const LoginCheck = async (data,role) => {
    console.log("The Sent data is here ", data);
    const url = `http://localhost:3000/${role}/Login`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include",
      body: JSON.stringify(data)
    });
    const res = await response.json();
    console.log("Here is the Result ", res.value);
    //console.log("The cookie that we got is ",document.cookie);
    return res.value;
  };

  const RemoveHome=async (id)=>{
    const url=`http://localhost:3000/user/removeFav/${id}`;
    console.log(id);
    const response=await fetch(url,{
      method:"GET",
      header:{
        "Content-Type":"application/json"
      },
      credentials:"include"
    })
    const res=await response.json();
    console.log("Result Array is ",res.result);
    return res;
  }



  return {send, SignUpUsers, LoginCheck,RemoveHome};

};


export default useBackend;