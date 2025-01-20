const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        mongoose
  .connect(`${process.env.REACT_APP_MONGODB_URL}`)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));
        
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1)
    }
}

module.exports = connectDB