import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const Loginuser = async(req,res)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }

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
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(token);

        res.status(200).json({...payload,token: token});
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}