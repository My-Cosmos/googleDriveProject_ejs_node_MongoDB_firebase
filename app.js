const express = require('express');
const app = express();
const userRouter = require('./routes/user.routes');

app.set('view engine', 'ejs');

/**
 * ~ In production level application we doesn't make/Create any route in 'app.js' file.
 *   ~~ we only configure routes in 'app.js' file.
 *   ~~ and make/Create routes in respective './routes' folder using **express.Router()** method.
 *   ~~ and export the routes also using **express.Router()** method.
 */
app.use('/user', userRouter);


app.listen(3000, ()=>{
  console.log(`Server is running on port 3000`);
})