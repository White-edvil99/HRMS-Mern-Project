const jwt = require('jsonwebtoken')
const User = require('../models/User')

const verifyUser = async (req,res,next)=>{
    try {
        const token = req.headers.authorization.split('')[1]
        if(!token){
            return res.status(404).json({success: false, error: "token not provided"})
        }
        const decoded = await jwt.verify(token, process.env.JWT_KEY)
        if(!decoded){
            return res.status(404).json({success: false, error: "token not valid"})
        }
        
        const user = await User.findById({_id: decoded._id}).select('-password')
        if(!user){
            return res.status(404).json({success: false, error: "User nOT Found"})
        }

        req.user = user
        next()

    } catch (error) {
        return res.status(500).json({success: false, error: "server side errro"})
    }
}

module.exports = verifyUser;