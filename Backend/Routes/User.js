const express=require('express');
const UserRouter=express.Router();
const {Filters,AllHomes,SignUp,Check,Login,Logout,favouritePersonal,GiveAFavourite,RemoveFavList,BookedTobeFinal,AddToBookedInside}=require('../Controller/UserController');

const middleWare=(req,res,next)=>{
return Login(req.body.email,req.body.password,req.body.role)(req,res,next);
}
const LogoutCall=(req,res,next)=>{
  //console.log("Till Logout middleware ran");
return Logout(req.session.user.id)(req,res);
}
const CallFavourite=(req,res,next)=>{
return favouritePersonal(req.params.id)(req,res);
}
const GiveAllFavourite=(req,res,next)=>{
return GiveAFavourite(req.session.user.id)(res);
}
const Remove=(req,res,next)=>{
  console.log(req.params.id);
  return RemoveFavList(req.session.user.id,req.params.id)(req,res);
}
const BookedFav=(req,res,next)=>{
return BookedTobeFinal(req.session.user.id)(res);
}
const AddToBooked=(req,res,next)=>{
return AddToBookedInside(req.session.user.id)(req,res); 
}


UserRouter.get('/AllHomes',AllHomes);
UserRouter.post('/SignUp',Check,SignUp);
UserRouter.post('/filters',Filters);
UserRouter.post('/',middleWare);
UserRouter.get('/Logout',LogoutCall);
UserRouter.get('/FavouriteHome/:id',CallFavourite);
UserRouter.get('/personalfavourite',GiveAllFavourite);
UserRouter.get("/removeFav/:id",Remove);
UserRouter.get("/BookedHomes",BookedFav);
UserRouter.post("/AddToBooked",AddToBooked);




module.exports=UserRouter