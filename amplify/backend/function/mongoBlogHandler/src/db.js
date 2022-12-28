const mongoose = require('mongoose')
//mongoose.set('strictQuery', false);
let conn = null;
const dbUrl = process.env.DB_URL

const connectToDb = async () =>{
    // if(isConnected){
    //     console.log("Using existing database connection")
    //     return Promise.resolve()
    // }

    // console.log("Setting up new database connection")
    // console.log(process.env.DB_URL)
    // return mongoose.connect(process.env.DB_URL).then(db=>{
    //     isConnected = db.connections[0].readyState
    // })
    // try {
    //     await mongoose.connect(dbUrl);
    //     console.log('Database connection successful');
    // } catch (error) {
    //     console.log('Database connection FAILED!');
    //     console.log(error.message);
    // }
    console.log("Inside connect db")

    try {
        if (conn == null) {
            conn = mongoose.connect(dbUrl, {
              serverSelectionTimeoutMS: 5000
            }).then(() => mongoose);
            
            // `await`ing connection after assigning to the `conn` variable
            // to avoid multiple function calls creating new connections
            await conn;
            console.log("Connection successful")
        }
        
        return conn;
    } catch (error) {
        console.log("connection error", error)
    }
}

module.exports = connectToDb