const mongoose=require('mongoose');
require('dotenv').config();

const Url = process.env.MONGO_URI || "mongodb://localhost:27017/hotel";

const connectToMongo=async ()=>{
  await mongoose.connect(Url).then(()=>{
    console.log("Connected TO Mongo");
  })
  .catch((err)=>{
    console.log("The error came is ",err);
  })
}

module.exports=connectToMongo;