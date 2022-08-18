//import mongoose module
const mongoose = require("mongoose");

//create note schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },

  }, {
  timestamps: true
}
);

const noteModel = mongoose.model("Note", noteSchema);
module.exports = { noteModel };