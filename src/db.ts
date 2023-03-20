import mongoose from 'mongoose';

export const connectToDB = () => {

    // use mongo db default url, in the absence of env variable
    const mongoUrl = process.env.DB_URL || "mongodb://localhost:27017/backstack";

    mongoose.connect(mongoUrl)
        .then(() => console.log(`Connected to DB`))
        .catch((error) => {
            console.log(`Unable to connect to DB, ERROR:- ${error}`);
            process.exit();
        })
}