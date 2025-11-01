const express=require('express');
require('dotenv').config();
const connectToMongo=require('./db');
const User=require('./Model/UserList');
const {upload}=require('./components/upload.js');
const MongoStore = require('connect-mongo');
const Hotelnames=require('./Model/HotelList');
const HostRouter=require('./Routes/Host.js');
const session=require('express-session');
const path=require('path')
const app=express();
const cors=require('cors');
const UserRouter=require('./Routes/User');

//This is used to make connection between frontend and backend sometimes what happens frontend or browser blocks the request from any type
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials:true
}));
app.use(express.text());
// FIXED: Add size limits for file uploads
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/uploads",express.static(path.join(__dirname, "components/uploads")));
const see=path.join(__dirname,'components/uploads/images/homePhotos');
console.log("To see in Rooot ",see);
console.log()
//For connecting it to the database
connectToMongo().then(async () => {
  await Hotelnames.aggregate([
    {
      $match:{SecondDate:{$ne:''}}
    },
    {
      $set:{convertedStringToDate:{$cond:{
        if:{$eq:[{$type:"$SecondDate"},"string"]},
        then:{$dateFromString:{dateString:"$SecondDate"}},
        else:"$SecondDate"
      }}}
    },
    {
      $set:{SecondDate:{$cond:[{$lte:[ "$convertedStringToDate",new Date()]},'',"$convertedStringToDate"]},FirstDate:{$cond:[{$lte:["$convertedStringToDate",new Date()]},'',"$SecondDate"]},Booked:{$cond:[{$lte:[ "$convertedStringToDate",new Date()]},'no',"$Booked"]}}
    },
    {
      $unset:"convertedStringToDate"
    },
    {
      $merge:{
        into:"hotelnames",
        whenMatched:"merge",
        whenNotMatched:"discard"
      }
    }
  ]);
});


//This is used to parse the cookie
app.use(session({
  secret: process.env.SESSION_SECRET || 'Prince',
  resave:false,
  saveUninitialized:false,
  store:MongoStore.create({
    mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/hotel',
    collectionName:'sessions'
  }),
  cookie:{
    maxAge:24*60*60*1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));

// REMOVED: Don't use upload globally - only use it on specific routes
// app.use(upload);


app.use('/user',UserRouter);
app.use('/host',HostRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT,(req,res)=>{
  console.log(`Server running on http://localhost:${PORT}`);
})