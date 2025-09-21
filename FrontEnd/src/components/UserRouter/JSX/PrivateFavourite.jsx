//Importing Css files
import '../Css/Private.css'
import {useContext} from 'react'
import {noteContext} from './NoteState/NoteState'

const PrivateFavourite=()=>{
  const {favourite,setFavourite}=useContext(noteContext);
  return(
  <>
  <div className="Home">
    <div className="Specific">
      <div className="ImageTobeShow"><img src="/images-LoginPage/Ac.jpeg"/></div>
      <div className="Details">
      <div className="nameToShow">{favourite.name}</div>
      <div className="PriceToShow">{favourite.price}</div>
      <div className="AddressToShow">{favourite.location[0]} &nbsp; &nbsp;&nbsp; {favourite.location[1]} </div>
      <img class="Scanner" src="/images-LoginPage/Scanner me.jpg" />
      </div>
    </div>
  </div>
  </>
)
}
export default PrivateFavourite