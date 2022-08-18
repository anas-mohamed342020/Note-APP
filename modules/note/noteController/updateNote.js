const { noteModel } = require("../../../DB/models/noteModel");




const updateNote = async (req, res) => {
    try {
        const { title, content, id } = req.body;
        const note = await noteModel.find({_id:id});
        if (note.length>0) {
            if (note[0].createdBy==req.user.id) {
                const updatenote = await noteModel.updateOne({ _id: id }, { title, content })
                res.status(200).json({ message: "Done", status: 200, updatenote })
            } else {
                res.status(400).json({ message: "you don't have a permission to update this note", status: 400 })
            }
        } else {
            res.status(404).json({ message: "note not existed", status: 404 });
        }
    } catch (error) {
        res.status(500).json({ message: "ERROR", error }); //catch error
    }

};
module.exports = {updateNote}