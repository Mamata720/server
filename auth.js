
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'crud',
  password: 'mamta@123',
  port: 5432,
})

module.exports=pool;





const router = require("express").Router();
const passport = require("passport");
const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    // console.log("/login/success",req)
    let allData=req.user._json
    const { email,name,url } = req.body
    let data=[allData.email,allData.name,allData.picture]
    pool.query('INSERT INTO loginuser (name, email,url) VALUES ($1, $2,$3)', 
    [name, email,url],function(err,result){
      if(err){
      // console.log(err,"error")
      throw err;
      }
      console.log("login record inserted")
      res.status(200).json({
        success: true,
        message: "login success",
        user: req.user,
          cookies: req.cookies
      });
  })
}
});

// router.get("/login/success", (req, res) => {
//   if (req.user) {
//     let allData=req.user._json
//     let data=[allData.email,allData.name,allData.picture]
//     let sql=`INSERT INTO users (Email_id,name,url) Values ?`;
//     con.query(sql,[[data]],function(err,result){
//       if(err){
//       console.log(err,"error")
//       throw err;
//       }
//       console.log("login record inserted")
//       res.status(200).json({
//         success: true,
//         message: "login success",
//         user: req.user,
//           cookies: req.cookies
//       });
//   })
// }
// });





router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "login failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});


router.get("/google", 
  passport.authenticate("google", { scope: ["profile", "email"] }),(req,res)=>{
  // console.log(req.body)
}
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router













