import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
export const register= async (req,res,next)=>{

try {
const hash =bcrypt.hashSync(req.body.password,5);
const newUser=new User({
...req.body,
password:hash,


});

//console.log("Before saving user:", newUser);
 await newUser.save();
//console.log("After saving user:", newUser);
res.status(201).send("user has been created");
}
catch(err){
next(err);
}


};

export const login= async (req,res,next)=>{
try{
    const user = await User.findOne({ username: req.body.username });
  
    if (!user) return next(createError(404, "User not found!"));
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, "Wrong password or username!"));

const token=jwt.sign({
id:user._id,
isSeller:user.isSeller, //as we r not going to allow seller to create review or order

},
process.env.JWT_KEY
);

      const {password,...info}=user._doc;//password na show ho isiliye usko exclude krdiya
      //by using the cookie we can reach that info inside cookie everywhere in our application
      res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  
}

catch(err){
next(err);
}



};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};