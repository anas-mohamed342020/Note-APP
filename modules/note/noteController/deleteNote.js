const { noteModel } = require("../../../DB/models/noteModel");




const deletenote = async (req, res) => {
    try {
        
        const { id } = req.body;
        const note = await noteModel.find({_id:id});
        if (note.length>0) {
            if (note[0].createdBy==req.user.id) {
                const deletednote = await noteModel.deleteOne({ _id: id })
                res.status(200).json({ message: "Done", status: 200, deletednote })
            } else {
                res.status(400).json({ message: "you don't have a permission to delete this note", status: 400 })
            }
        } else {
            res.status(404).json({ message: "note not existed", status: 404 });
        }
    } catch (error) {
        res.status(500).json({ message: "ERROR", error }); //catch error
    }

};
module.exports = {deletenote}