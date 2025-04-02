import User from '../models/User.js';
export const Registeruser = async(req,res)=>{
    try{
        const { 
            ownerName,
            email,
            password,
            confirmPassword,
            mobile,
            role,
            shopName,
            GSTIN,
            shopLocation
          }=req.body
        const subscription={
            plan:"Free",
        }
        console.log(`INFO: User Registered:${ownerName}--${email}--${mobile}--${role}--${shopName}--${GSTIN}--${shopLocation}`)
        let user = await User.findOne({mobile})
        console.log(user)
        if(user!=null){
            return res.status(400).json({"message":"User already registered please login"})
        }else{
            user = new User({ 
              ownerName,
              email,
              password,
              mobile,
              role,
              shopName,
              subscription,
              shopLocation,
              GSTIN
            })
            await user.save();
            res.status(201).json({ message: "User registered successfully, Please Login" });
    }
}
    catch(error){
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}