const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
///////seccttion////
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const errorController = require('./controllers/error');
const User = require('./models/user');

///remove url retry end part of line
const MONGODB_URI =
'mongodb+srv://dipakpratale158:9637570697d@cluster0.bxsjizd.mongodb.net/shop'

const app = express();
////constructure pass some option
const store = new MongoDBStore({
  uri: MONGODB_URI,
  //name anything sessions
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  ///an chane resave: false////
  session({ secret: 'my secret',
   resave: false, 
   saveUninitialized: false,
  store:store
  })
);

app.use((req, res, next) => {
  User.findById('6480ebbc7fe0021c3c12132a')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
