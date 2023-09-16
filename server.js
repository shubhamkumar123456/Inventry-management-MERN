const express = require("express");
const cors = require("cors");
const app = express();
const  mongooseConnect  = require("./utils/dbconnection");
const adminRoutes = require('./routes/adminRoutes')
const productRoutes= require('./routes/productRoute')
const orderRoutes = require('./routes/orderRoutes')

const fileUpload = require("express-fileupload");
mongooseConnect()

const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use('/user',adminRoutes)
app.use('/product',productRoutes)
app.use('/order',orderRoutes)

  app.listen(port,()=>{
    console.log(`listening on ${port}`)
  });

