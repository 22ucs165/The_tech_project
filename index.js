const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.routes");
const { productRouter } = require("./routes/product.routes");
const { fileRouter } = require("./file.router");
const {passport} = require("./configs/google.oauth");
const { userModel } = require("./models/user.model");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());

app.set('views',__dirname+'/views');
app.set('view engine','hbs');

app.get("/",async (req, res) => {
  // res.sendFile(__dirname+'/views/index.html');
  res.render('index');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  async function(req, res) {
    const user = await userModel.findOne({email: req.user._json.email});
    if(user){
      const {name, email, password, role, wishlist, oauth} = user
      const payload = {name, email, password, role, wishlist, oauth};
      const token = jwt.sign(payload,process.env.key);
      res.cookie('token',token);
    }
    else{
      let payload = {
        name: req.user._json.name,
        email: req.user._json.email,
        password: await bcrypt.hash('vansh',+process.env.saltRounds),
        role: "user",
        wishlist: [],
        oauth: {
          google: req.user._json.sub,
          registered: false
        }
      }

      payload.oauth = CryptoJS.AES.encrypt(JSON.stringify(payload.oauth),process.env.cryptoKey).toString();
      const new_user = new userModel(payload);

      await new_user.save();

      const token = jwt.sign(payload,process.env.key);
      res.cookie('token',token);

    }
    
    res.redirect('/');
});

app.get('/auth/github',async (req, res) => {
  const {code} = req.query;
  let response = await fetch('https://github.com/login/oauth/access_token',{
    method:'POST',
    headers:{
      'Content-type':'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: 'https://thetechproject.cyclic.app/auth/github'
    })
  })

  response = await response.json();
  console.log(response);

  let userDetails = await fetch('https://api.github.com/user',{
    method:'GET',
    headers:{
      authorization: `Bearer ${response.access_token}`
    }
  })

  userDetails = await userDetails.json();
  
  let userEmail = await fetch('https://api.github.com/user/emails',{
    method:'GET',
    headers:{
      authorization: `Bearer ${response.access_token}`
    }
  })

  userEmail = await userEmail.json();


  var email = userEmail.filter(elem => elem.primary === true)[0].email;


  if(!email){
    return res.redirect('/')
  }

  const user = await userModel.findOne({email});
  if(user){
    const {name, email, password, role, wishlist, oauth} = user
    const payload = {name, email, password, role, wishlist, oauth};
    const token = jwt.sign(payload,process.env.key);
    res.cookie('token',token);
  }
  else{
    let payload = {
      name: userDetails.name,
      email: email,
      password: await bcrypt.hash('vansh',+process.env.saltRounds),
      role: "user",
      wishlist: [],
      oauth: {
        github: userDetails.id,
        registered: false
      }
    }

    payload.oauth = CryptoJS.AES.encrypt(JSON.stringify(payload.oauth),process.env.cryptoKey).toString();
    const new_user = new userModel(payload);

    await new_user.save();

    const token = jwt.sign(payload,process.env.key);
    res.cookie('token',token);

  }
  
  res.redirect('/');
})

app.use("/ttp",userRouter);
app.use('/',fileRouter);
app.use("/ttp/products",productRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (error) {
    console.log("error while connecting to DB");
    console.log(error);
  }
  console.log(`server is running at ${process.env.port}`);
});

/*
{
  sub: '107520562056112635909',
  name: 'Shravan Singh',
  given_name: 'Shravan',
  family_name: 'Singh',
  picture: 'https://lh3.googleusercontent.com/a/AGNmyxaUmAJfk2CG0p3DS0jq2Vr3NvWmUvTRq3XiouCG0g=s96-c',
  email: 'singhshravan1208@gmail.com',
  email_verified: true,
  locale: 'en-GB'
}
*/