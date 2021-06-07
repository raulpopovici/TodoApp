const cookieParser = require("cookie-parser")
const express = require("express");

const cors = require("cors");
const userRouter = require("./routes/users");


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000/",
        optionsSuccessStatus: 200,
    })
);



app.get("/", (req,res)=> {return res.status(200).send({hello: "HEllo"})})

app.use("/api",userRouter);

app.listen(5000,()=>{
    console.log("Server running on port 5000")
});

