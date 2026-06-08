import "dotenv/config"
import express from "express"
import cors from "cors"
import morgan from "morgan"





const app = express()
const Port = process.env.PORT | 4000

//middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes
app.get("/",(req,res)=>{
    res.json({status:"success",data:{
    message:"server is active"  
         }})
})

app.use((req,res)=>{
     res.status(404).json({status:"success",data:{
      message:"404 - notfound"
    }})
})


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});


app.listen(Port,()=>{
  console.log(`server running on 127.0.0.1:${Port}`)

})
