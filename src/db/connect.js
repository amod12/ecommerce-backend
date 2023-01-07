const mongoose = require('mongoose');
module.exports = connect=async()=>{
    try{
      //database = takeaway
        await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("connected to mongodb");
    }catch(error){
        console.error(error);
    }
  }
  
