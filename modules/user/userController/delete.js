const { userModel } = require("../../../DB/models/userModel");


const deleteUser = async (req,res)=>{
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.user.id).select('-password -verified');
        if(deletedUser){
            res.status(200).json({message:"Done",deletedUser})
        }else{
            res.status(404).json({message:"user not found"})
        }    
    } catch (error) {
        res.status(500).json({ message: "ERROR", error }); //catch error
    }

}


module.exports ={deleteUser}