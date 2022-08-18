const { noteModel } = require("../../../DB/models/noteModel");
const creatnote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await noteModel.insertMany({ title, content, createdBy: req.user.id });
        res.status(201).json({ message: "done", status: 201, note });
    } catch (error) {
        res.status(500).json({ message: "ERROR", error }); //catch error
    }
};
module.exports = { creatnote }