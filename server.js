const express = require('express');
const cors = require('cors');
const  app = express();
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');


const corOptions = {
  origin : 'https://localhost:8081'
};

/** Middlewares */
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

/** Routers */
app.use('/api/products',productRouter);
app.use('/api/users',userRouter);


app.get('/',(req, res)=>{
    res.json({message : "Hello World!"})
});

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

