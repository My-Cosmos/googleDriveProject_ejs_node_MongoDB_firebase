const express = require('express');
const router = express.Router();

router.get('/register',(req,res)=>{
  res.render('authPages/register');
});

router.post('/register', (req,res)=>{
  console.log(req.body);
  res.send("Got the Users");
})

module.exports = router;