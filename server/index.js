const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
require("dotenv").config()
app.use(express.json())
const authRoutes = require("./Routers/authRoutes")
const userRoutes = require("./Routers/userRoutes")
const cookieParser = require("cookie-parser")
app.use(cookieParser())

app.use(cors({
    origin:'*',
    optionSuccessStatus:200
}))

const PORT = process.env.PORT || 8000

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

mongoose.connect(
  `${process.env.DB_CONNECT}`,
  {
    dbName: "1Bit",
  },
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log(err);
})


app.get("/", (req, res) => {
    res.send("API is working!");
});

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
      success:false,
      message,
      statusCode,
    })
})

app.listen(PORT, () => {
  try {
    console.log(`Running on port ${PORT}`);
  } catch (error) {
    console.log(`Some Error while running on ${PORT}`);
  }
});
