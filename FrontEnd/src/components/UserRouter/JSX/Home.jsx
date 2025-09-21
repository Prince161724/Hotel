import React, { useEffect, useState ,useContext,useRef} from 'react';
import '../Css/Home.css';
import {noteContext} from './NoteState/NoteState'
import {HomeArrayList} from './HomeArrayList'
import useSend from './FunctionToBackend'
import {useNavigate} from 'react-router-dom'
function Home() {
  const Navigate=useNavigate();
  const {send}=useSend();
  const {ArrayList,setArrayList,Endpage,setEndPage,setStartPage,startpage,loginstate}=useContext(noteContext);
  const [load,setLoad]=useState(localStorage.getItem('loginstate'));
  useEffect(()=>{
    //Login Should be Done or not
    loginstate.current=localStorage.getItem('loginstate');
    console.log("It ran for ",localStorage.getItem('loginstate'));
    console.log("It ran for ",loginstate);
    if(loginstate){
      console.log("It's ok ",loginstate);
    }
    else{
      Navigate("/");
    }
  },[loginstate]);

  const ChangeLogin=async ()=>{
    const url="http://localhost:3000/user/Logout"
    const response=await fetch(url,{
      method:'GET',
      credentials:"include"
    })
    const res=response.json();
    localStorage.setItem('loginstate',false);
    Navigate("/");
  }

  const [price, setPrice] = useState(1000);
  const [Filters, setFilter] = useState({
    location:"",
    comfort: [],
    Price: 0,
    Property: "",
    cancellation:""
  })
  

  const Cancellation=(e)=>{ 
    e.preventDefault();
    const {value,name}=e.currentTarget;
    if(!Filters[name].includes(value)){
    setFilter((prev)=>{
      const updated={...prev,[name]:value};
      ////console.log(updated);
      return updated;}
    )}
    else{
      Filters[name]='';
    }
    ////console.log("Filters are here ",Filters);
  }
  useEffect(() => {
    ////console.log("Use Effect For Button Runs Here");
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
    ////console.log("Use Effect FOr sentData Runs Here Runs Here");
    const sentData = {
    }
    //////console.log("Filter is THis ", Filters);
    if (Filters.comfort.length > 0) sentData.comfort = Filters.comfort;
    if (Filters.Property) sentData.Property = Filters.Property;
    if (Filters.Price > 0) sentData.Price = Filters.Price;
    if (Filters.cancellation) {
      ////console.log("Cancellation is here");
      sentData.cancellation = Filters.cancellation;}
    ////console.log("SentData is Here ", sentData);
    const dataGot=await send(sentData);
    ////console.log("Data us here what you sent from back ",dataGot);
    ////console.log("Now it is at ",count);
    if(count.current>=1){
    ////console.log("Now it increased to ",count);
    setArrayList(dataGot.Hotels);
  }
    count.current++;
    ////console.log("Sent to Backend");
  }
toRun();
}, [Filters])



  const Change = (e) => {
    const { name, value } = e.currentTarget;
    ////console.log("Chnage Function Runs Here");
    setPrice(e.currentTarget.value);
    setFilter((prev) => {
      const updated = { ...prev, [name]: value };
      ////console.log("Here is the upadted Array of the Price", updated);
      return updated;
    })
  };


  const previousVa=useRef(1);
 const ChangePage=(e)=>{
  e.preventDefault();
  ////console.log("Endpage is ",Endpage," startpage is ",startpage);
  const {value}=e.currentTarget;
  ////console.log("Value is ",value);
  const Toincrease=value-previousVa.current;
  ////console.log("previousVa is ",previousVa," Toincrease is ",Toincrease);
  const Toadd=Toincrease*12;
  const EndAdd=(Toincrease)*12;
  ////console.log("Toadd is ",Toadd," EndAdd is ",EndAdd);
  setStartPage((prev)=>{
    const num=Number(value);
    const updated=Toadd+prev;
    ////console.log("Here is the Start page",updated);
    return updated;
  })
  setEndPage((prev)=>{
    const updated=prev+EndAdd;
    ////console.log("End Page is setting here",updated);
    return updated;
  });
  previousVa.current=value;
 }


  //Function to add in arrays of something
  const add = (e) => {
    e.preventDefault();
    ////console.log("Add Function Runs Here");
    const { name, value } = e.currentTarget;
    ////console.log("name ",name ,"target is ",value);
    if (!name) return;
    setFilter((prev) => {
      if (!prev[name]) { return { [name]: [] }; }
      if (prev[name].includes(value)) {
        const updated = { ...prev, [name]: prev[name].filter(item => item !== value) };
        //////console.log(updated);
        return updated;
      }
      const updated = { ...prev, [name]: [...prev[name], value] };
      ////console.log(updated);
      return updated;
    })
  }
  const [states, setStates] = useState([
  "mumbai,maharashtra",
  "pune,maharashtra",
  "nashik,maharashtra",
  "nagpur,maharashtra",
  "aurangabad,maharashtra",
  "solapur,maharashtra",
  "thane,maharashtra",
  "kolhapur,maharashtra",
  "amravati,maharashtra",
  "sangli,maharashtra",
  "jalgaon,maharashtra",
  "akola,maharashtra",
  "latur,maharashtra",
  "dhule,maharashtra",
  "satara,maharashtra",
  "beed,maharashtra",
  "ratnagiri,maharashtra",
  "parbhani,maharashtra",
  "nanded,maharashtra",
  "osmanabad,maharashtra",
  "chandrapur,maharashtra",
  "wardha,maharashtra",
  "gondia,maharashtra",
  "bhandara,maharashtra",
  "yavatmal,maharashtra",
  "washim,maharashtra",
  "hingoli,maharashtra",
  "gadchiroli,maharashtra",
  "raigad,maharashtra",
  "sindhudurg,maharashtra",
  "palghar,maharashtra",
  "ahmednagar,maharashtra",
  "mira-bhayandar,maharashtra",
  "vasai-virar,maharashtra",
  "panvel,maharashtra",
  "kalyan,maharashtra",
  "ulhasnagar,maharashtra",
  "dombivli,maharashtra",
  "navi mumbai,maharashtra",
  "badlapur,maharashtra",
  "ambarnath,maharashtra",
  "bhiwandi,maharashtra",
  "karjat,maharashtra",
  "alibag,maharashtra",
  "murbad,maharashtra",
  "roha,maharashtra",
  "khopoli,maharashtra",
  "pen,maharashtra",
  "uran,maharashtra",
  "shahapur,maharashtra",
  "rohini,delhi",
  "saket,delhi",
  "janakpuri,delhi",
  "preet vihar,delhi",
  "connaught place,delhi",
  "chandni chowk,delhi",
  "dwarka,delhi",
  "pitampura,delhi",
  "karol bagh,delhi",
  "delhi cantt,delhi",
  "vasant kunj,delhi",
  "hauz khas,delhi",
  "lajpat nagar,delhi",
  "greater kailash,delhi",
  "rajouri garden,delhi",
  "patel nagar,delhi",
  "kalkaji,delhi",
  "malviya nagar,delhi",
  "punjabi bagh,delhi",
  "ashok vihar,delhi",
  "paschim vihar,delhi",
  "mehrauli,delhi",
  "shalimar bagh,delhi",
  "rohini sector 3,delhi",
  "model town,delhi",
  "civil lines,delhi",
  "gtb nagar,delhi",
  "azadpur,delhi",
  "new friends colony,delhi",
  "jangpura,delhi",
  "sangam vihar,delhi",
  "uttam nagar,delhi",
  "okhla,delhi",
  "narela,delhi",
  "najafgarh,delhi",
  "bhajanpura,delhi",
  "seelampur,delhi",
  "krishna nagar,delhi",
  "patparganj,delhi",
  "inderpuri,delhi",
  "mayur vihar,delhi",
  "sarita vihar,delhi",
  "anand vihar,delhi",
  "yamuna vihar,delhi",
  "sadar bazaar,delhi",
  "bangalore,karnataka",
  "mysore,karnataka",
  "mangalore,karnataka",
  "hubli,karnataka",
  "belgaum,karnataka",
  "gulbarga,karnataka",
  "davanagere,karnataka",
  "shimoga,karnataka",
  "tumkur,karnataka",
  "udupi,karnataka",
  "hassan,karnataka",
  "bidar,karnataka",
  "chitradurga,karnataka",
  "kolar,karnataka",
  "chikmagalur,karnataka",
  "mandya,karnataka",
  "chickballapur,karnataka",
  "bagalkot,karnataka",
  "haveri,karnataka",
  "koppal,karnataka",
  "raichur,karnataka",
  "ramanagara,karnataka",
  "gadag,karnataka",
  "mandya,karnataka",
  "davangere,karnataka",
  "chikmagalur,karnataka",
  "salem,tamil nadu",
  "chennai,tamil nadu",
  "coimbatore,tamil nadu",
  "madurai,tamil nadu",
  "tiruchirappalli,tamil nadu",
  "tiruppur,tamil nadu",
  "vellore,tamil nadu",
  "erode,tamil nadu",
  "dindigul,tamil nadu",
  "kanchipuram,tamil nadu",
  "thanjavur,tamil nadu",
  "cuddalore,tamil nadu",
  "nagercoil,tamil nadu",
  "tiruvannamalai,tamil nadu",
  "krishnagiri,tamil nadu",
  "namakkal,tamil nadu",
  "karur,tamil nadu",
  "sivakasi,tamil nadu",
  "hosur,tamil nadu",
  "ambattur,tamil nadu",
  "kumbakonam,tamil nadu",
  "rajapalayam,tamil nadu",
  "pudukkottai,tamil nadu",
  "pollachi,tamil nadu",
  "mettupalayam,tamil nadu",
  "gudiyatham,tamil nadu",
  "tambaram,tamil nadu",
  "perambalur,tamil nadu",
  "thiruvarur,tamil nadu",
  "theni,tamil nadu",
  "viluppuram,tamil nadu",
  "vaniyambadi,tamil nadu",
  "ranipet,tamil nadu",
  "arakkonam,tamil nadu",
  "tindivanam,tamil nadu",
  "avadi,tamil nadu",
  "melur,tamil nadu",
  "chengalpattu,tamil nadu",
  "tuticorin,tamil nadu",
  "ramanathapuram,tamil nadu",
  "ariyalur,tamil nadu",
  "dharmapuri,tamil nadu",
  "uthamapalayam,tamil nadu",
  "lucknow,uttar pradesh",
  "kanpur,uttar pradesh",
  "ghaziabad,uttar pradesh",
  "agra,uttar pradesh",
  "varanasi,uttar pradesh",
  "meerut,uttar pradesh",
  "noida,uttar pradesh",
  "allahabad,uttar pradesh",
  "bareilly,uttar pradesh",
  "aligarh,uttar pradesh",
  "moradabad,uttar pradesh",
  "gorakhpur,uttar pradesh",
  "firozabad,uttar pradesh",
  "jhansi,uttar pradesh",
  "muzaffarnagar,uttar pradesh",
  "mathura,uttar pradesh",
  "budaun,uttar pradesh",
  "rampur,uttar pradesh",
  "shahjahanpur,uttar pradesh",
  "faizabad,uttar pradesh",
  "sitapur,uttar pradesh",
  "mirzapur,uttar pradesh",
  "bulandshahr,uttar pradesh",
  "sultanpur,uttar pradesh",
  "gonda,uttar pradesh",
  "azamgarh,uttar pradesh",
  "etawah,uttar pradesh",
  "bahraich,uttar pradesh",
  "farrukhabad,uttar pradesh",
  "mainpuri,uttar pradesh",
  "lalitpur,uttar pradesh",
  "amroha,uttar pradesh",
  "bijnor,uttar pradesh",
  "saharanpur,uttar pradesh",
  "barabanki,uttar pradesh",
  "ballia,uttar pradesh",
  "rae bareli,uttar pradesh",
  "unnao,uttar pradesh",
  "basti,uttar pradesh",
  "jaunpur,uttar pradesh",
  "deoria,uttar pradesh",
  "etah,uttar pradesh",
  "kolkata,west bengal",
  "howrah,west bengal",
  "durgapur,west bengal",
  "siliguri,west bengal",
  "asansol,west bengal",
  "kharagpur,west bengal",
  "haldia,west bengal",
  "bardhaman,west bengal",
  "malda,west bengal",
  "raiganj,west bengal",
  "kalyani,west bengal",
  "baharampur,west bengal",
  "darjeeling,west bengal",
  "krishnanagar,west bengal",
  "cooch behar,west bengal",
  "jalpaiguri,west bengal",
  "chandannagar,west bengal",
  "serampore,west bengal",
  "uluberia,west bengal",
  "halisahar,west bengal",
  "bongaon,west bengal",
  "mehsana,gujarat",
  "vadodara,gujarat",
  "rajkot,gujarat",
  "bhavnagar,gujarat",
  "jamnagar,gujarat",
  "gandhinagar,gujarat",
  "junagadh,gujarat",
  "anand,gujarat",
  "nadiad,gujarat",
  "morbi,gujarat",
  "bharuch,gujarat",
  "bhuj,gujarat",
  "porbandar,gujarat",
  "palanpur,gujarat",
  "valsad,gujarat",
  "vapi,gujarat",
  "navsari,gujarat",
  "godhra,gujarat",
  "patan,gujarat",
  "dahod,gujarat",
  "amreli,gujarat",
  "surendranagar,gujarat",
  "botad,gujarat",
  "veraval,gujarat",
  "dwarka,gujarat",
  "kandla,gujarat",
  "dholka,gujarat",
  "mandvi,gujarat",
  "wankaner,gujarat",
  "modasa,gujarat",
  "idar,gujarat",
  "lunawada,gujarat",
  "borsad,gujarat",
  "khambhat,gujarat",
  "manavadar,gujarat",
  "savarkundla,gujarat",
  "upleta,gujarat",
  "jetpur,gujarat",
  "dhoraji,gujarat",
  "mangrol,gujarat",
  "songadh,gujarat",
  "vyara,gujarat",
  "rajpipla,gujarat",
  "silvassa,gujarat",
  "hyderabad,telangana",
  "warangal,telangana",
  "nizamabad,telangana",
  "khammam,telangana",
  "karimnagar,telangana",
  "ramagundam,telangana",
  "mahbubnagar,telangana",
  "adilabad,telangana",
  "suryapet,telangana",
  "miryalaguda,telangana",
  "jagtial,telangana",
  "siddipet,telangana",
  "mancherial,telangana",
  "nalgonda,telangana",
  "bhadradri,telangana",
  "medak,telangana",
  "wanaparthy,telangana",
  "kamareddy,telangana",
  "vikarabad,telangana",
  "medchal,telangana",
  "sangareddy,telangana",
  "mahabubabad,telangana",
  "narayanpet,telangana",
  "jangaon,telangana",
  "sircilla,telangana",
  "gadwal,telangana",
  "peddapalli,telangana",
  "mulugu,telangana",
  "nagarkurnool,telangana",
  "bhupalpally,telangana",
  "nirmal,telangana",
  "bhainsa,telangana",
  "korutla,telangana",
  "armoor,telangana",
  "manthani,telangana",
  "metpally,telangana",
  "tandur,telangana",
  "zaheerabad,telangana",
  "shadnagar,telangana",
  "banswada,telangana",
  "madnoor,telangana",
  "jaipur,rajasthan",
  "jodhpur,rajasthan",
  "kota,rajasthan",
  "ajmer,rajasthan",
  "udaipur,rajasthan",
  "bikaner,rajasthan",
  "alwar,rajasthan",
  "bharatpur,rajasthan",
  "sikar,rajasthan",
  "jhunjhunu,rajasthan",
  "dholpur,rajasthan",
  "churu,rajasthan",
  "nagaur,rajasthan",
  "pali,rajasthan",
  "dausa,rajasthan",
  "tonk,rajasthan",
  "sawai madhopur,rajasthan",
  "karauli,rajasthan",
  "jaisalmer,rajasthan",
  "sirohi,rajasthan",
  "banswara,rajasthan",
  "baran,rajasthan",
  "dungarpur,rajasthan",
  "bundi,rajasthan",
  "jhalawar,rajasthan",
  "pratapgarh,rajasthan",
  "chittorgarh,rajasthan",
  "hanumangarh,rajasthan",
  "sri ganganagar,rajasthan",
  "barmer,rajasthan",
  "bhilwara,rajasthan",
  "rajsamand,rajasthan"
]);
const [list,setList]=useState([""]);
  const [search,setSearch]=useState("");

  //Use Effect for hiding the suggesstion
  const hide=useRef(0);
  useEffect(()=>{
    const buttonTo=document.querySelector(".Suggestion");
    const ListButtonsDiv=document.querySelector(".ListButtonsDiv");
    if(buttonTo  && search!='' && hide.current==0){
      buttonTo.classList.remove("hiddenAt");
      ////console.log("UseEffect 1");
    }
    if(ListButtonsDiv  && search!='' && hide.current==0){
      buttonTo.classList.remove("hiddenAt");
      ////console.log("UseEffect 2");
    } 
    if(hide.current>0 || search==''){
      buttonTo.classList.add("hiddenAt");
      ////console.log("UseEffect Last");
      hide.current=0;
    }
  },[search]);
  const OnChangeSearch=(e)=>{
    e.preventDefault();
    const {value}=e.currentTarget;
    ////console.log("value is this ",value);
    setList(()=>{
      const updated=states.filter(state=>state.startsWith(value.toLowerCase())).map(state=>{
        const word=state.split(",");
        const toReturn = word
  .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
  .join(" ");
return toReturn;
      })
      return updated;
      })
    setSearch(()=>{
      ////console.log("The Value Till here is in Upper ",value);
      const updated=value;
      return(updated);
    });
    
  }
  const Property = (e) => {
    const { name, value } = e.currentTarget;
    setFilter((prev) => {
      const updated = { ...prev, [name]: value };
      ////console.log(updated);
      return updated;
    })


  }
  const Tosee = (e) => {
    e.preventDefault();
  const { value } = e.currentTarget; // yaha save kar liya
  setSearch(() => {
    ////console.log("The Value Till here is in Tosee", value);
    const updated = value; 
    const buttonTo=document.querySelector(".Suggestion");
    buttonTo.addEventListener("click",()=>{
       buttonTo.classList.add("hiddenAt");
     })
    return updated;
  });
  hide.current++;
};
  

  const getDateSearch=(e)=>{
    e.preventDefault();
    ////console.log("Now Submitted with value is teh another",search);
  }
  const getDate=(e)=>{
    e.preventDefault();
    ////console.log("Now Submitted with value ",e.currentTarget.value);
  }
  const RemoveFil=()=>{
    setFilter({
      location:"",
    comfort: [],
    Price: 0,
    Property: "",
    cancellation:""
    });
    ////console.log("Filters is here ",Filters);
  }
  return (
    <>
      <div className="Home">
        <div className="Heading">Home</div>
        <button id="Log-Out" onClick={ChangeLogin}>Log Out</button>
        <div className="Navbar">
          
            {/* From Here I Will Write Search */}
            <form>
              <input
              list="suggestions"
              type="search"
              id="site-search"
              name="search"
              placeholder="Type Any Place You want"
              className="search-Input"
              onChange={OnChangeSearch}
              value={search}
              />
              <div className="Suggestion hiddenAt">
                <ul >
              {list.map((lists,index)=>(
                  <div key={index} className="ListButtonsDiv" ><button className="ListButtons" key={index} onClick={Tosee} value={lists}>{index}&nbsp;.{
                    lists}</button></div>
              ))}
              </ul>
              </div>
              
            <button htmlFor="site-search" className="search-Label" onClick={getDateSearch}>Search</button>
            </form>
            

            {/* From Here I Will Write Date */}
            <form onSubmit={getDate} action="/" method="GET">
              <label htmlFor="dob" className="date-Label">Select Date</label>
            <input type="date" id="dob" name="dob" onChange={getDate}/>
            
            </form>
            

            {/*From Here I will Write Filter Code*/}
            <i className="fas fa-filter"></i>
            <button type="button" id="span-Filter">Filter</button>
            <button className="Clear-All-Filters" onClick={RemoveFil}>Clear All Filters</button>
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
            </div>
          </div>
        </form>
        <div className="HomeArrayListSoo">
          {console.log("loginstate is", typeof(loginstate),loginstate.current)}
          {localStorage.getItem('loginstate') && <HomeArrayList className="Component-HomeArrayList" />}
        </div>
        <h1 id="extra">Pages</h1>
        <div className="Pagination">
          <button className="Pagi-buttons ToChange" name="firstButton" value="1"  onClick={ChangePage}>1</button>
          <button className="Pagi-buttons ToChange" name="SecondButton" value="2" onClick={ChangePage}>2</button>
          <button className="Pagi-buttons ToChange" name="ThridButton" value="3" onClick={ChangePage}>3</button>
          <button className="Pagi-buttons ToChange" name="firstButton" value="4"  onClick={ChangePage}>4</button>
          <button className="Pagi-buttons ToChange" name="SecondButton" value="5" onClick={ChangePage}>5</button>
        </div>
      </div>
    </>
  );
}

export default Home;