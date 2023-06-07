const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect =require("./util/database").mongoConnect
const user=require('./models/user')
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("647fcee1a9e63f095382b615")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
  next()
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoConnect(()=>{
// console.log(client)

app.listen(3000)
})