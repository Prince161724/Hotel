const Hotelnames=require('../Model/HotelList');
const User=require('../Model/UserList');
const bcrypt=require('bcrypt');
const {body,validationResult}=require('express-validator');
//Filters To fetch Homes
exports.Filters=async (req,res,next)=>{
  //console.log("It is coming here only");
  const {comfort,Property,Price,cancellation}=req.body;
  const query={}
  if(comfort) query.comfort={$in:comfort}
  if(Property) query.propertyType=Property;
  if(Price) query.price={$lt:Price}; 
  if(cancellation) query.cancellation=cancellation;


  const Hotels=await Hotelnames.find(query);
  res.json({Hotels:Hotels});
}
// To Get All Homes At Starting 
exports.AllHomes=async (req,res,next)=>{
const Hotels=await Hotelnames.find();
const Updated=await User.findById(req.session.user.id);
const fav=Updated.BookedFinal;
console.log("The Homes which came in this are ",fav);
const getUpdated=await Hotelnames.updateMany(
  {_id:{$in:fav},Booked:{$exists:false}},
  {$set:{Booked:"yes"}}
)
const getu=await Hotelnames.find({_id:{$in:fav}});
console.log("The updated ones are ",getUpdated);
res.send(Hotels);
}

//To Get User Account Created
exports.SignUp=async (req,res,next)=>{
  const {name,email,password,cpassword}=req.body;
  const salt=await bcrypt.genSalt(10);
  const SecurePass=await bcrypt.hash(password,salt);
  const user=new User({
    name:name,
    email:email,
    password:SecurePass
  }
  )
  user.save().then(()=>{
    //console.log("Saved SuccessFully");
    res.send({Saved:"Saved SuccessFully"});
  })
  .catch((err)=>{
    //console.log("This is the error " ,err);
  })
}


//Login Request And Verification Goes here
exports.Login=(email,password,role)=>{
return async (req,res,next)=>{
  console.log("The User Credentials are ",req.body);
  const user=await User.findOne({email:email});
  const usserId=user._id.toString();
  //console.log("The Id that i got here  ",user._id.toString());
  if(!user){
    return res.status(400).json("There is No registered user with specific name");
  }
  const compare=await bcrypt.compare(password,user.password);
  console.log("Comapre is ",compare);
  if(compare){
    //console.log("Till Here its ok");
    //console.log(user);
    req.session.user={
      id:usserId,
      name:user.name,
      role:role
    };
    if(req.session.user){
      //console.log("This is what we wanted ",req.session.user);
    }
    return res.json({value:compare});
  }
else{
  return res.json({value:compare});
}
}
}


//Add To Booked Homes
exports.AddToBookedInside=(id)=>{
  return async (req,res)=>{
    console.log("req is ",req);
    console.log("req body ",req.body);
    console.log("req body is ida ",req.body.ida);
    const {ida}=req.body;
    console.log("Atleast it cam till here",ida);
    const Updated=await User.updateMany(
      {_id:id},
      {$addToSet:{BookedFinal:ida}},
      {new:true}
    )
    return res.json({Updated:Updated});
  }
}


//Booked Homes to Give
exports.BookedTobeFinal=(id)=>{
  console.log("Id is Coming till here ",id);
  return async (res)=>{
    try{
      const user=await User.findById(id).populate('BookedFinal');
      const arr=user.BookedFinal;
      console.log("BookedHomes are here ",arr);
      return res.status(200).json({arr:arr});
    }
    catch{
      return res.status(201).json({arr:[]});
    }
  }
}


exports.Logout=(id)=>{
  return (req,res)=>{
    //console.log("This //console func ran");
    if(req.session.user.id==id){
      req.session.destroy();
      res.send({result:"Deleted session"})
    }
    else{
      res.send({result:"Failed to logout"});
    }
  }
}

//Personal Favourite
exports.favouritePersonal=(id)=>{
return async (req,res)=>{
   console.log("ID of the Home ",id);
   console.log("ID of the User ",req.session.user.id);
  if(req.session.user.id){
    const user=await User.updateOne(
      {_id:req.session.user.id},
      {$addToSet:{favourites:id}}
    )
  }
  try{
    const home=await Hotelnames.findById(id);
  return res.json({home:home}); 
  }
  catch{
  return res.status(400).json({home:"No Home Found"}); 
  }
}
}






//Give All Favourites to the user on demand
exports.GiveAFavourite=(id)=>{
return async (res)=>{
  try{  
  const user=await User.findById(id).populate('favourites');
  const array=user.favourites;
  return res.json({array:array});
}
  catch{
    return res.status(400).json({array:"Sorry nothing found"});
  }
    
}
}


exports.RemoveFavList=(sessionId,id)=>{
return async (req,res)=>{
  try{
    const user=await User.findByIdAndUpdate(
  sessionId,
  {$pull:{favourites:id}},
  {new:true}
)
console.log("user is this ",user);
return res.json({result:user.favourites});
  }
  catch{
return res.json({result:"Sorry Error found"});
}
}
}


//Express-Validator and checker Goes Here
exports.Check=[
  body('name')
  .isLength({min:5}).withMessage("Please Enter a Little Longer Name"),
  body('email')
  .isEmail()
  .withMessage("Please Enter a valid Email"),
  body('password')
  .isLength({min:6})
  .withMessage("Please enter a long password"),
  body('cpassword')
  .custom((value,{req})=>{
    if(value!=req.body.password){
      throw new Error("Passwords Do not Match");
    }
    return true;
  }), async (req,res,next)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).send({errors:errors.array()});
  }
next();
}]