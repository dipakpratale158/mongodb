exports.getLogin = (req, res, next) => {
    const isLoggedIn = req.get('Cookie')
      .split(';')
      .map(item => item.trim().split('='))
      .find(([key]) => key === 'loggedIn');
  
    res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated: isLoggedIn
    });
  };
  
  exports.postLogin = (req, res, next) => {
    res.setHeader('Set-Cookie', 'loggedIn=True');
    res.redirect('/');
  };
  