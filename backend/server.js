import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import productRouter from './routes/productRoutes.js'


dotenv.config();//to use process.env environment variables
connectDB();

const app=express();

app.get('/',(req,res)=>{
    res.send('api is running ')

})

app.use('/api/products',productRouter)

//here we are overriding the error middleware
//because the middleware that are present before this
//if any error occur in that middle simply error-async-handler is calling the 
//next in that some method is invoked that for error handling so we are below
//overriding that error
//so the first argumnet is err to override that error and that function takes four(4) args
//and next for calling the next middleware
app.use((err,req,res,next)=>{
    const statusCode=res.statusCode===200?500:res.statusCode;
    res.status(statusCode)//here we are setting the statusCode
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV==='production'?null:err.stack
    })

})




const port=process.env.PORT || 5000 ;

app.listen(port,console.log(`server running in ${process.env.NODE_ENV} on port ${port}`))