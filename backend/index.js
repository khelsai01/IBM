const express=require("express");

const cors=require("cors");
require("dotenv").config()
const { cont } = require("./connection");
const userRoute = require("./Routes/user");
const http = require("http");
const session = require("express-session");
const passport = require("passport");
const { userModel } = require("./Model/user.model");
const { Server } = require("socket.io");
const bugRouter = require("./Routes/bug.routes");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const app=express();
const server = http.createServer(app);
const PORT=process.env.PORT ||8080;



const clientid = "351492689096-ljc1g40jumcio0di6n5a4pl0pd4mt4ot.apps.googleusercontent.com"
const clientsecret = "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"

app.use(cors());
app.use(express.json())

app.use(session({
    secret:"1234slide",
    resave:false,
    saveUninitialized:true
}))


app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:clientid,
        clientSecret:clientsecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        console.log(profile)
        try {
            let user = await userModel.findOne({googleId:profile.id});

            if(!user){
                user = new userModel({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                });

                await user.save();
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/bug",
    failureRedirect:"http://localhost:3000/auth"
}))

app.get("/login/sucess",async(req,res)=>{

    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})

app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:3001");
    })
})

app.use("/api",userRoute);
app.use("/api",bugRouter)

// app.use("/api",productRoute)
// app.get("/",(req,res)=>{
//     res.status(200).send({message:"Welcome to Backend by Shivendra for api/register and api/login {for Products => api/products(for post product) products/(for get product) api/products/:id(for single product) api/products/:id (for edit patch) api/products/:id(for delete the product) "})
// })

//**********************Chat************** */
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });

server.listen(PORT,async()=>{
    try {
        await cont
        console.log(`Server is running at ${PORT} and Connected to MongoDB`)
        
    } catch (error) {
        console.error(`${error}`)
    }
    
})