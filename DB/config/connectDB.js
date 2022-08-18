//import
const mongoose = require('mongoose')

//.env => secure file store important data and hide when upload to server
const runDB = async()=>{
    return await mongoose.connect(process.env.CONNECTION_STRING).then((result)=>{
         console.log( `connected`);
    }).catch((err)=>{
        console.log("fail to connect DB",err);
    })
}
module.exports = runDB