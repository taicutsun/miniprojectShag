const express = require("express");
app = express();
//const bodyParser = require('body-parser');
const cors = require("cors");

const dishes=[
{
name:"burger",
price:"10$"
},
{
name:"potato",
price:"20$"
},
{
name:"pizza",
price:"30$"
},
];
let basket=[];


app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html');
});

app.get('/basket',(req,res)=>{
  res.sendFile(__dirname + '/basket.html');
});

app.post('/basket',(req,res)=>{
const data = req.body;


let dish = dishes.find((d) => {
if(d.name === data.name){
    return d.name;
    } 
  
  });
basket.push(dish);

res.json(basket);
});


app.listen(3001);