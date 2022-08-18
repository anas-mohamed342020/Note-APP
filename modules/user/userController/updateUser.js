const { userModel } = require("../../../DB/models/userModel");

const updateUser = async (req, res) => {
    try {
        const{name} = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(req.user.id,{name},{new:true}).select('-password -verified')
        if(updatedUser){
            res.status(200).json({message:"Done",updatedUser})
        }else{
            res.status(404).json({message:"User not found",status:404})
        }    
    } catch (error) {
        res.status(500).json({ message: "ERROR", error }); //catch error
    }
}

module.exports = { updateUser }