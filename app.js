const express = require('express');
const app = express();
const authRouter = require('./routes/authRoutes/auth.routes');

// Set the view engine to EJS
app.set('view engine', 'ejs');
// Set the 'views' directory (default is './views')
app.set('views', './views'); // default is set only
// load static files.
app.use(express.static('public'));
// ~ to read req.body in post routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/auth-route', authRouter);


app.listen(3000, ()=>{
  console.log(`Server is running on port 3000`);
})