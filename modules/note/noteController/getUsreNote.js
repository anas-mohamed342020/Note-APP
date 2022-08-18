const { noteModel } = require("../../../DB/models/noteModel");
const { userModel } = require("../../../DB/models/userModel");

const log = console.log;

const getUsernotes = async (req, res) => {
  try {
    log(req.user);
    const id = req.user.id
    const user = await userModel.find({ _id: id });
    if (user.length > 0) {
      console.log(req.user);
      if (req.user.id == id || req.user.role == "Admin") {
        const notes = await noteModel.find({ createdBy: id });
        res.status(200).json({ message: "Done", status: 200, notes });
      } else {
        res.status(400).json({ message: "you are not authorized" });
      }
    } else {
      res.status(400).json({ message: "user not existed", status: 400 });
    }
  } catch (error) {
    res.status(500).json({ message: "ERROR", error }); //catch error
  }
};
module.exports = { getUsernotes };
