var express = require('express');
var router = express.Router();
var userHelpers = require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.user) {
    
    if (req.session.admin) {
      res.redirect('/admin')
    }else{
      res.redirect('/user-home')
    }
    
  } else {
    res.render('users/index');
  }


});

router.get('/login-register', function (req, res) {
  if (req.session.user) {
    if(req.session.admin){
      res.redirect('/admin')
    }else{
      res.redirect('/user-home')
    }
    
  } else {
    res.render('users/login-register')
  }

})
router.post('/register', (req, res) => {
  if (req.session.user) {
    
    if(req.session.admin){
      res.redirect('/admin')
    }else{
      res.redirect('/user-home')
    }
  }
   else {
    userData = req.body
    userHelpers.doSignup(userData).then((response) => {
      console.log(response);
      res.json(response)
    }).catch((response) => {
      res.json(response)
    })

  }


})

router.post('/login', (req, res) => {

  if (req.session.user) {
    
    if(req.session.admin){
      res.redirect('/admin')
    }else{
      res.redirect('/user-home')
    }
  } else {
    userData = req.body

    userHelpers.doLogin(userData).then((response) => {

      if (response.user.admin) {
        req.session.user = req.body
        req.session.admin = true
        res.json(response)
      } else {
        req.session.user = req.body
        res.json(response)
      }




    }).catch((response) => {
      res.json(response)
    })
  }




})
router.get('/user-home', (req, res) => {
  if (req.session.user) {

    if(req.session.admin){
      res.redirect('/admin')
    }else{
      res.render('users/shop-no-sidebar')
    }
   
    
  } else {
    res.redirect('/')
  }


})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})



module.exports = router;
