import React, { useEffect, useState ,useContext,useRef} from 'react';
import '../Css-Files/Home.css';
import {noteContext} from '../NoteState/NoteState'
import {HomeArrayListTwo} from './HomeArrayList'
import send, { lengtho } from './FunctionToBackend'

function TwoPage() {

  const {ArrayList,setArrayList}=useContext(noteContext);

  const [price, setPrice] = useState(1000);
  const [Filters, setFilter] = useState({
    comfort: [],
    Price: 0,
    Property: "",
    cancellation:""
  })
  
  
  const [freeCancellation,setFreeCancellation]=useState('');

  const Cancellation=(e)=>{ 
    e.preventDefault();
    const {value,name}=e.currentTarget;
    if(!Filters[name].includes(value)){
    setFilter((prev)=>{
      const updated={...prev,[name]:value};
      //console.log(updated);
      return updated;}
    )}
    else{
      Filters[name]='';
    }
    //console.log("Filters are here ",Filters);
  }
  useEffect(() => {
    //console.log("Use Effect For Button Runs Here");
    const button = document.getElementById("span-Filter");
    const form = document.querySelector(".hidden");
    button.addEventListener("click", () => {
      form.classList.remove("hidden");
    });
    const cross = document.getElementById("cross");
    cross.addEventListener("click", () => {
      form.classList.add("hidden");
    })
  }, [])
  const count=useRef(0);
  useEffect(() => {
    const toRun=async ()=>{
    //console.log("Use Effect FOr sentData Runs Here Runs Here");
    const sentData = {
    }
    ////console.log("Filter is THis ", Filters);
    if (Filters.comfort.length > 0) sentData.comfort = Filters.comfort;
    if (Filters.Property) sentData.Property = Filters.Property;
    if (Filters.Price > 0) sentData.Price = Filters.Price;
    if (Filters.cancellation) {
      //console.log("Cancellation is here");
      sentData.cancellation = Filters.cancellation;}
    //console.log("SentData is Here ", sentData);
    const dataGot=await send(sentData);
    //console.log("Data us here what you sent from back ",dataGot);
    //console.log("Now it is at ",count);
    if(count.current>=1){
    //console.log("Now it increased to ",count);
    setArrayList(dataGot);
  }
    count.current++;
    //console.log("Sent to Backend");
  }
toRun();
}, [Filters])



  const Change = (e) => {
    const { name, value } = e.currentTarget;
    //console.log("Chnage Function Runs Here");
    setPrice(e.currentTarget.value);
    setFilter((prev) => {
      const updated = { ...prev, [name]: value };
      //console.log("Here is the upadted Array of the Price", updated);
      return updated;
    })
  };



  //Function to add in arrays of something
  const add = (e) => {
    e.preventDefault();
    //console.log("Add Function Runs Here");
    const { name, value } = e.currentTarget;
    if (!name) return;
    setFilter((prev) => {
      if (!prev[name]) { return { [name]: [] }; }
      if (prev[name].includes(value)) {
        const updated = { ...prev, [name]: prev[name].filter(item => item !== value) };
        ////console.log(updated);
        return updated;
      }
      const updated = { ...prev, [name]: [...prev[name], value] };
      //console.log(updated);
      return updated;
    })
  }


  const Property = (e) => {
    const { name, value } = e.currentTarget;
    setFilter((prev) => {
      const updated = { ...prev, [name]: value };
      //console.log(updated);
      return updated;
    })

  }
  return (
    <>
      <div className="Home">
        <div className="Navbar">
          <form action="#" method="GET">
            {/* From Here I Will Write Search */}
            <input
              list="suggestions"
              type="search"
              id="site-search"
              name="search"
              placeholder="Type Any Place You want"
              className="search-Input"
            />
            <button htmlFor="site-search" className="search-Label">Search</button>

            {/* From Here I Will Write Date */}
            <label htmlFor="dob" className="date-Label">Select Date</label>
            <input type="date" id="dob" name="dob" />

            {/* From Here I Will Write Drop Down */}
            <label htmlFor="city" className="label-Select">Select City</label>
            <select id="city" name="city">
              <option value="" defaultValue>Select One</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Gurgaon">Gurgaon</option>
              <option value="Chennai">Chennai</option>
              <option value="Mumbai">Mumbai</option>
            </select>

            {/*From Here I will Write Filter Code*/}
            <i className="fas fa-filter"></i>
            <button type="button" id="span-Filter">Filter</button>
          </form>
        </div>
        <form action="#" method="GET" id="form-1" className="hidden">
          <div className="container-1 ">
            <div className="filters">
              Filters
              <button type="button" id="cross">&times;</button>
            </div>
            <div className="content-area">
              <h1 id="h01">Recommended for you</h1>
              <div className="container">
                <button
                  type="button"
                  className="ImageDiv"
                  onClick={add}
                  name="comfort"
                  value="geyser"
                >
                  <img src="images-LoginPage\Geyser.jpeg" className="ImageID" />
                  <p>Geyser</p>
                </button>

                <button
                  type="button"
                  className="ImageDiv"
                  onClick={add}
                  name="comfort"
                  value="Wi-Fi"
                >
                  <img src="/images-LoginPage/wifi.jpg" className="ImageID" />
                  <p>Free Wifi</p>
                </button>

                <button
                  type="button"
                  className="ImageDiv"
                  onClick={add}
                  name="comfort"
                  value="Washing-machine"
                >
                  <img src="/images-LoginPage/washing.jpg" className="ImageID" />
                  <p>Washing Machine</p>
                </button>
                <button
                  type="button"
                  className="ImageDiv"
                  onClick={add}
                  name="comfort"
                  value="Washing-machine"
                >
                  <img src="/images-LoginPage/Ac.jpeg" className="ImageID" />
                  <p>Ac</p>
                </button>

              </div>


                <h1 id="h01">Free Cancellation</h1>
              <div className="Cancellation">
                <div className="conatiner-of-buttons">
                  <button className="Type-buttons" name="cancellation" value="yes" onClick={Cancellation} type="submit">Yes</button>
                  <button className="Type-buttons" name="cancellation" value="no" onClick={Cancellation}
                    type="button" >No</button>
                </div>
              </div>

              

              <div className="PriceSlider">
                <h1 id="h01">Price Range</h1>
                <span className="starting starting-first">{price}</span>
                <input
                  type="range"
                  id="priceRange"
                  min="7800"
                  max="50000"
                  step="100"
                  value={price}
                  onInput={Change}
                  name="Price"
                />
                <span className="starting">10000</span>
                <p id="pricePara">Price: <span id="price">{price}</span> ₹</p>
              </div>

              <h1 id="h01">Property Type</h1>
              <div className="Property-Type">
                <button className="Property-buttons" name="Property" value="house" onClick={Property} type="button">house</button>
                <button className="Property-buttons" name="Property" value="apartment" onClick={Property} type="button">apartment</button>
                <button className="Property-buttons" name="Property" value="bungalow" onClick={Property} type="button">bungalow</button>
                <button className="Property-buttons" name="Property" value="apartment" onClick={Property} type="button">apartment</button>

              </div>
              <div>{lengtho}</div>
            </div>
          </div>
        </form>
        <div className="HomeArrayListSoo">
          <HomeArrayListTwo className="Component-HomeArrayList" />
        </div>
        <h1 id="extra">Pages</h1>
        <div className="Pagination">
          <button className="Pagi-buttons">1</button>
          <button className="Pagi-buttons">2</button>
          <button className="Pagi-buttons">3</button>
        </div>
      </div>
    </>
  );
}

export default TwoPage;