const express = require("express");
app = express();
const path = require("path");
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs'); 


//data
const dishes=[
{
name:"burger",
price:10
},
{
name:"potato",
price:20
},
{
name:"pizza",
price:30
},
];// menu
let basket=[];//for basket 
const balance=25;
let sumOfPrice=0;
//data


//get
app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html');
});

app.get('/basket',(req,res)=>{
  console.log(basket);
for(let i=0;i<basket.length;i++){
sumOfPrice+=basket[i].price;
console.log(`summ=${sumOfPrice}`)
}
  res.render(path.join(__dirname,'public','views','basket.hbs'),{
    dishVisible:true,
    basket,
    sumOfPrice});
});

app.get("/buy",(req,res)=>{
  if(balance>=sumOfPrice){
    console.log('truing')
    res.render(path.join(__dirname,'public','views','buy.hbs'),{success:true,});
  }
  else if(balance<=sumOfPrice){
    console.log('truing')
    res.render(path.join(__dirname,'public','views','buy.hbs'),{success:false,});
  }
})
//get

//post
app.post('/basket',(req,res)=>{
const data = req.body;

let dish = dishes.find((d) => {
if(d.name === data.name){
  //console.log(`d.name=${d.name}`)
  return d.name
    } 
  
  });
  basket.push(dish);

res.json(basket);
});

//post

app.listen(3001);