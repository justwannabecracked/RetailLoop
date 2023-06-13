const mongoose = require("mongoose");
const connectDatabase = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
    });
    console.log("MongoDB Database Successfully Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
