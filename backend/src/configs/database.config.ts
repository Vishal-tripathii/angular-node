import {connect, ConnectOptions} from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

export const dbConnect = () => {
    const mongoURI = process.env.MONGO_URI;
    connect(process.env.MONGO_URI!, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions)
    .then(  
        () => console.log("!!!Connected Sucessfully!!!"),
        (error) => console.log(error, "An Error has occured!!")
    )
}