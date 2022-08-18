const { userModel } = require("../../../DB/models/userModel");
const open = require("openurl")
var nodeoutlook = require('nodejs-nodemailer-outlook')
const jwt = require("jsonwebtoken");
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const path = require('path')
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body; //get data from body

    const userEmail = await userModel.findOne({ email }); // check if email is existed
    if (userEmail) {
      // in case of finding email
      res.status(401).json({ message: "This Email is already existed" });
    } else {
      // if this email is unique
      const addeduser = await userModel.insertMany({
        name,
        email,
        password,
      });
      // create reusable transporter object using the default SMTP transport
      let userData = {
        id: addeduser[0]._id,
      };
      const token = jwt.sign(userData, process.env.tokenKey);

      const message = `<p style="display:inline-block; font-family: 'cursive', Courier, monospace;">to confirm <a href="${req.protocol}://${req.headers.host}/confirm/${token}"> click here</a></p>`;
      await sendEmail(addeduser[0].email, message);
      res.status(201).json({ message: "Done", addeduser }); //created
    }
  } catch (error) {
    res.status(500).json({ message: "ERROR", error }); //catch error
  }
};

async function sendEmail(email, message) {
nodeoutlook.sendEmail({
  auth: {
      user: process.env.senderEmail,
      pass: process.env.senderPassword
  },
  // service: "outlook",

  from: process.env.senderEmail,
  to:email,
  subject: 'Test',
  html: message,
  text: 'TTTEEESSSTTT',
  replyTo: email,
  
  onError: (e) => console.log(e),
  onSuccess: (i) => console.log(i)
}


);

}

const confirm = async (req, res) => {
  // try {
    const { token } = req.params;
    let userData = jwt.verify(token, process.env.tokenKey);
    let id = userData.id;
    const user = await userModel.findById(id);
    if (user) {
      if (user.verified) {
        res.status(401).json({ message: "user already verified" });
      } else {
        const verifiedUser = await userModel.updateOne(
          { _id: id },
          { verified: true }
        );

        
        open.open(path.join(__dirname,'../../../../stickly_note/index.html'))

        res.status(200).json({ message: "Done", verifiedUser });
        
      }
    } else {
      res.status(404).json({ message: "user not found" });
    }
  // } catch (error) {
  //   res.status(500).json({ message: "ERROR", error }); //catch error
  // }
};

const forgetPasswordSend = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      if (user.verified) {
        const activationCode = nanoid(6);
        await userModel.updateOne({ _id: user.id }, { activationCode });
        const message = `<p>your activation Code is <span style="padding:10px; background-color:blue; color:white;border-radius: 7px;">${activationCode}</span></p>`;
        await sendEmail(user.email, message);
        res
          .status(StatusCodes.ACCEPTED)
          .json({
            message: "Done check your email",
            status: ReasonPhrases.ACCEPTED,
          });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({
            message: "please verify your email",
            status: ReasonPhrases.ACCEPTED,
          });
      }
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "email not exist", status: ReasonPhrases.NOT_FOUND });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "ERROR",
        error,
        status: ReasonPhrases.INTERNAL_SERVER_ERROR,
      }); //catch error
  }
};

const changeForgetPass = async (req, res) => {
  try {
    const { email, aCode, nPassword } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      if (user.verified) {
        const actCode = user.activationCode;
        if (aCode == actCode) {
          const activationCode = nanoid(6);
          let passwordHashed = await bcrypt.hash(
            nPassword,
            parseInt(process.env.SALT)
          );
          await userModel.updateMany(
            { _id: user._id },
            { password: passwordHashed, activationCode: activationCode }
          );
          res
            .status(StatusCodes.ACCEPTED)
            .json({ message: "Done", status: ReasonPhrases.ACCEPTED });
        } else {
          res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "in-valid activation code" });
        }
      } else {
        res.status(400).json({ message: "please verify your email" });
      }
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "email not exist", status: ReasonPhrases.NOT_FOUND });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "ERROR",
        error,
        status: ReasonPhrases.INTERNAL_SERVER_ERROR,
      });
  }
};

module.exports = { signUp, confirm, forgetPasswordSend, changeForgetPass };
