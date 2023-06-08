const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('6480ebbc7fe0021c3c12132a')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.session.save((err)=>{
console.log(err)
res.redirect('/')
      });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
