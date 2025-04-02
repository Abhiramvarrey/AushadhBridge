import User from '../models/User.js'
export const updateProfile = async(req, res)=>{
    try{
        const { _id, name, shopName } = req.body
        const user = await User.findByIdAndUpdate(_id, { ownerName: name, shopName }, { new: true })
        const payload = {
            _id: user._id,
            email: user.email,
            ownerName: user.ownerName,
            role: user.role,
            shopName: user.shopName,
            mobile: user.mobile,
            subscription: {
              plan: user.subscription?.plan,
              validUntil: user.subscription?.validUntil,
            }
          }

          res.status(200).json(payload);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

export const getProfile = async(req,res)=>{

}
