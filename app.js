
const express = require("express");
 const app = express();

 const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));
 app.use(express.static("public"));
app.get( '/',function(req,res)
{
   res.sendFile(__dirname+"/index.html");
});

app.post("/" ,function(req,res)
{
const first = req.body.fname;
const last =req.body.lname;
const em = req.body.email;
const data = {

   members:[ {
      email_address: em ,
      status:"subscribed",
      merge_fields : {
         FNAME :first,
         LNAME : last
      }
   }
   ]
};
   const Jsondata = JSON.stringify(data);
   const url = "https://us21.api.mailchimp.com/3.0/lists/cd06999e82";

      const options ={
         method :"POST",
         auth : "avi19:6b32cf8447aa17698e87ffdc1b5ef9c0-us21"
      }
  const  request = https.request(url, options, function(response)
   {
      if (response.statusCode===200)
      {
        res.sendFile(__dirname+"/sucess.html");
      }
      else {
         res.sendFile(__dirname+"/failure.html");
      }
     response.on ("data", function(data)
     {
        console.log(JSON.parse(data));
     })
   })

   request.write(Jsondata);
   request.end();
});


app.post("/failure",function(req,res)
{
   res.redirect("/");
})

 app.listen(process.env.PORT||3000, function()
 {
    console.log("Server si running on 3000");
 });




 //6b32cf8447aa17698e87ffdc1b5ef9c0-us21

 //listid
 //cd06999e82