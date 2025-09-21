import {createContext,useState,useEffect,useRef} from 'react'
const noteContext=createContext();

function NoteState(props){

const [ArrayList,setArrayList]=useState([
  ]);
  const [startpage,setStartPage]=useState(0);
  const [Endpage,setEndPage]=useState(12);
  const loginstate=useRef(false);
  const [favourite,setFavourite]=useState();
  const [bookedhome,setBookedhome]=useState([]);
  useEffect(()=>{
    console.log(loginstate.current);
    // loginstate.current=localStorage.getItem('loginstate');
    console.log("The value at local Storage is ",localStorage.getItem('loginstate'))
    console.log(loginstate.current);
  },[loginstate])
  return(
  <noteContext.Provider value={{ArrayList,setArrayList,setStartPage,startpage,Endpage,setEndPage,loginstate,favourite,setFavourite,setBookedhome,bookedhome}}>
  {props.children}
</noteContext.Provider>)
}

export default NoteState;
export { noteContext };