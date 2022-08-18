const { auth } = require('../../middlewear/auth');
const { handelValidation } = require('../../middlewear/handleValidation');
const { endPoints } = require('./endPoints');
const { deleteUser } = require('./userController/delete');
const { signIn } = require('./userController/signIn');
const { signUp, confirm, forgetPasswordSend, changeForgetPass } = require('./userController/signUp');
const { updateUser } = require('./userController/updateUser');
const { signUpSchema, signInSchema, updateScheme, token, sendACode, changePassword } = require('./validation');
const path = require('path')
const router = require('express').Router();



router.post('/signup', handelValidation(signUpSchema), signUp)
router.post('/signin', handelValidation(signInSchema), signIn)
router.patch('/user/update', auth(endPoints.updateProfile), handelValidation(updateScheme), updateUser)
router.delete('/user/delete', auth(endPoints.updateProfile), deleteUser)
router.get('/confirm/:token', handelValidation(token), confirm)
// router.get('/test',(req,res)=>{
//     // console.log('file:'+path.join(__dirname,'../../../stickly_note/index.html'));
//     res.redirect('../../index.html - Shortcut.lnk')
//     // res.json('file:///E:/Second_Term/desktop/new/stickly_note/index.html')

// })
router.post('/user/sendvcode',handelValidation(sendACode),forgetPasswordSend)
router.patch('/user/changeforget',handelValidation(changePassword),changeForgetPass)


module.exports = router