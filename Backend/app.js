const express=require('express');
const connectToMongo=require('./db');
const User=require('./Model/UserList');
const bcrypt=require('bcrypt');
const MongoStore = require('connect-mongo');
const Hotelnames=require('./Model/HotelList');
const session=require('express-session');
const app=express();
const cors=require('cors');
const UserRouter=require('./Routes/User')
// const HostRouter=require('./Routes/Host')


//This line is used to covert the coming Strings from frontend to objects in Backend req objects 
app.use(express.json());
//This is used to make connection between frontend and backend sometimes what happens frontend or browser blocks the request from any type
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));
//For connecting it to the database
connectToMongo();
//This is used to parse the cookie
app.use(session({
  secret:'Prince',
  resave:false,
  saveUninitialized:false,
  store:MongoStore.create({
    mongoUrl:'mongodb+srv://root:cmXn1GfALlyvrRMB@hotel.zl9hnzd.mongodb.net/?retryWrites=true&w=majority&appName=Hotel',
    collectionName:'sessions'
  }),
  cookie:{
    maxAge:24*60*60*1000,
    secure:false,
    sameSite:'lax'
  }
}));

app.use('/',(req,res,next)=>{
  console.log("This request passed this body");
  console.log("This request passed this body",req.body);
  if(req.body.role){
    if(req.body.role=='Renter'){
      res.redirect('/user');
    }
    else{
      res.redirect('/Landlord');
    }
  }
  next();
})
app.use("/user",UserRouter);
//Host Router
// app.get('/host',HostRouter);

// app.get('/homes',async (req,res,next)=>{
//   const Hotelname=await Hotelnames.find();
//   res.send(Hotelname);
// })
app.listen(3000,(req,res)=>{
  console.log("http://localhost:3000");
})