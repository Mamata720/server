
const pool=require("./db_posst");
const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();
const path=require("path");
const console = require("console");
const PORT=process.env.PORT || 8000;

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);
app.use('/Clint',express.static(path.join(__dirname,"build"))); 
 
app.get('/Clint/*', (req, res) => { 
 res.sendFile(path.join(__dirname,"build","index.html")) 
  })

app.use(express.json())


app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);



app.post("/api/create",(req,res)=>{
  const { name, email } = req.body
  pool.query(`INSERT INTO users (name,email) Values ($1, $2)`,[name, email])
    res.send(JSON.stringify({status:200, error:null, response:"new record addd"}))
})


app.get("/api/view",(req,res)=>{
  const id = parseInt(req.params.id)
  pool.query('SELECT * FROM users ORDER BY id ASC',(err,result)=>{
    if(err)throw err;
    res.send(JSON.stringify({status:200, error:null, response:"new record addd"}))
  });
});


app.get("/api/view/:id",(req,res)=>{
  const id = parseInt(req.params.id)
  pool.query('SELECT * FROM users WHERE id = $1',[id], (err,result)=>{
    if(err)throw err;
    res.send(JSON.stringify({status:200,error:null,response:result}));
  });
});





app.put("/api/update/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body
  pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3',[name, email, id], (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record updated SuccessFully" }));
	});
});


app.delete("/api/delete/:id",(req,res)=>{
  const id = parseInt(req.params.id)
  pool.query('DELETE FROM users WHERE id = $1', [id],(err,result)=>{
    if(err)throw err;
    res.send(JSON.stringify({status:200,error:null,response:"Record delete"}))
  })
})




app.use("/auth", authRoute);

app.listen(PORT,()=>{
  console.log(`server started on port ${PORT}`)
})






















// app.post("/api/create",(req,res)=>{
//   var todo=req.body.todo
//   var category=req.body.category
//   var Email_id =req.body.email
//   var data=[todo,category,Email_id]
//   let sql1=`INSERT INTO user (todo,category,Email_id) Values ?`;
//   con.query(sql1,[[data]],function(err,result){
//     if(err)throw err;
//     res.send(JSON.stringify({status:200, error:null, response:"new record addd"}))
//   })
// })


// app.get("/api/view",(req,res)=>{
//   let sql= " SELECT * FROM user ";
//   let query=con.query(sql,(err,result)=>{
//     if(err)throw err;
//     res.send(JSON.stringify({status:200,error:null,response:result}));
//   });
// });


// app.get("/api/view/:id",(req,res)=>{
//   let sql="SELECT * FROM user WHERE id=" +req.params.id;
//   let query=con.query(sql,(err,result)=>{
//     if(err)throw err;
//     res.send(JSON.stringify({status:200,error:null,response:result}));
//   });
// });





// app.put("/api/update/", (req, res) => {
// 	let sql = "UPDATE user SET todo='" + req.body.todo + "', category='" + req.body.category + "' WHERE id=" + req.body.id;
// 	let query = con.query(sql, (err, result) => {
// 		if (err) throw err;
// 		res.send(JSON.stringify({ status: 200, error: null, response: "Record updated SuccessFully" }));
// 	});
// });


// app.delete("/api/delete/:id",(req,res)=>{
//   let sql="DELETE FROM user WHERE id="+req.params.id+"";
//   let query=con.query(sql,(err,result)=>{
//     if(err)throw err;
//     res.send(JSON.stringify({status:200,error:null,response:"Record delete"}))
//   })
// })




// app.use("/auth", authRoute);

// app.listen(8000,()=>{
//   console.log("server started on port 8000..")
// })






















































































































