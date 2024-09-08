import express from 'express';
import resultRouter from './routes/Result.js';
import userRouter from './routes/User.js'
import { connectDB } from './utils/DB.js';
import cors from 'cors';
import 'dotenv/config'
const app = express();
const port = 2000;

// database connection
connectDB();

//middlewares
app.use(express.json());
app.use(cors({
    origin :"https://gemini-clone-weld.vercel.app"
}));

app.get('/',(req,res)=>{
    res.send('server is running');
})

// routers 
app.use('/api-v1/result',resultRouter);
app.use('/api-v1/user',userRouter)
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})