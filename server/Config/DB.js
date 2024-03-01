import mongoose from "mongoose";

const mongooseConnection = async (url) => {
    return await mongoose.connect(url)
}

export default mongooseConnection;