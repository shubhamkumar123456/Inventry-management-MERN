const mongoose = require("mongoose");
require("dotenv").config();
const connecToDb = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("connected to mongoDB");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  module.exports =connecToDb;
