const mongoose=require('mongoose');

const Url="mongodb+srv://root:cmXn1GfALlyvrRMB@hotel.zl9hnzd.mongodb.net/?retryWrites=true&w=majority&appName=Hotel";

const connectToMongo=async ()=>{
  await mongoose.connect(Url).then(()=>{
    console.log("Connected TO Mongo");
  })
  .catch((err)=>{
    console.log("The error came is ",err);
  })
}

module.exports=connectToMongo;