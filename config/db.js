import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongo DB connected: ${con.connection.host}`);
    } catch(err) {
        console.log(`Error : ${err}`);
        process.exit();
    }
};