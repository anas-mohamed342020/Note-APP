const { auth } = require('../../middlewear/auth');
const { endPoints } = require('./endPoints');

const { handelValidation } = require('../../middlewear/handleValidation');
const { noteValidation, updatenoteValidation, idValidation, deleteValidation, nodata } = require('./validation');

const { creatnote } = require('./noteController/createNote');
const { deletenote } = require('./noteController/deleteNote');
const { updateNote } = require('./noteController/updateNote');
const { getUsernotes } = require('./noteController/getUsreNote');
const { getAllnotes } = require('./noteController/getAllNotes');



const router = require('express').Router();

router.post("/note/add", auth(endPoints.noteCrud), handelValidation(noteValidation), creatnote)
router.patch('/note/update',auth(endPoints.noteCrud),handelValidation(updatenoteValidation),updateNote)
router.delete('/note/delete',auth(endPoints.noteCrud),handelValidation(idValidation),deletenote)
router.get('/note/usernotes',auth(endPoints.getUsers),handelValidation(nodata),getUsernotes)
router.get('/note/getallnotes',auth(endPoints.getUsers),handelValidation(nodata),getAllnotes)

module.exports = router