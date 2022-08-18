const { noteModel } = require("../../../DB/models/noteModel");

const getAllnotes = async (req,res)=>{
    try {
        const notes = await noteModel.find().populate([{
            path:"createdBy",
            select:"name email"
        }])
        if(notes.length>0){
            res.status(200).json({message:"Done",status:200,notes})
        }else{
            res.status(200).json({message:"No data"})
        }    
    } catch (error) {
        res.status(500).json({ message: "ERROR", error }); //catch error
    }
}
module.exports = {getAllnotes}