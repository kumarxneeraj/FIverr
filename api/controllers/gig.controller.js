import gigModel from "../models/gig.model.js";
import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";


export const createGig=async(req,res,next)=>{

    if(!req.isSeller){
        return next(createError(403,"Only sellers can create a gig"));
    } 
    //creating a object
 const  newGig=new Gig({
 userId:req.userId, //userid from jwt...imp to take userId from jwt becoz other user can take different userId
 ...req.body,

 });

 try{
const savedGig=await newGig.save();
res.status(201).json(savedGig);

 }

 catch(err){
next(err)

 }
};

export const deleteGig=async(req,res,next)=>{

try{
const gig =await Gig.findById(req.params.id);

if(gig.userId!=req.userId){

   return  next(createError(403,"You can delete only your gig!"));
}
await Gig.findByIdAndDelete(req.params.id);
res.status(200).send("Gig has been deleted");
}
catch(err){

    next(err);
}
    
}
export const getGig=async(req,res,next)=>{

    try{
        const gig =await Gig.findById(req.params.id);
        if(!gig){
next(createError(404,"Gig not found"));

        }
         res.status(200).send(gig);

    }
    catch(err){
    
        next(err);
    }
    
}
export const getGigs=async(req,res,next)=>{
const q=req.query;

const filters={


    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }), // //if there is some category in out query then cat:q.cat otherwise it will not implement 
    ...((q.min || q.max) && { //if there is a query for min price or max price then we will check for both individual and then apply it accordingly 
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }), //mongodb regex function and option =i will take care that it will not lower upper case sensitive
   

}

    try{
const gigs=await Gig.find(filters).sort({[q.sort]:-1}); //this sort function is used to sort the gig cards q.sort because we want to sort them according to newest first or best selling option if we rite sort=price in link it will sort acc to price
res.status(200).send(gigs);

    }
    catch(err){
    
        next(err);
    }
    
}
