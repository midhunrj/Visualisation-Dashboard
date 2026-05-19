const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const  dataRouter  = require('./routes/dataRoutes')
const InitialiseDashboardData = require('./utils/initialiseDashData')
dotenv.config()
const app=express()
const corsOptions = {
    origin: [process.env.CLIENT_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
}
app.use(cors(corsOptions))

app.use('/insights',dataRouter)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" Successfully connected to MongoDB");

    return InitialiseDashboardData();
  })
  .then(() => {
    console.log(" Successfully imported dashboard data");
  })
  .catch((error) => {
    console.error(" Error in MongoDB connection:", error.message);
  });

const port=process.env.PORT
app.listen(port,()=>{
    console.log(`server has been stared running successfully at https://localhost:${port}`);
    
})