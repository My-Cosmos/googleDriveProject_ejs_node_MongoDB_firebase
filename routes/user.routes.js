const express = require('express');
const router = express.Router();

router.get('/test', (req,res)=>{
  res.send('user Test Route');
})

module.exports = router;