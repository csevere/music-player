var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//getting the login page
router.get('/login', function(req, res) {
     var message = req.query.msg;
         if(message == "badlogin"){
            message="Incorrect Login"    
        }else if (message == null){
            message = " "
        }
    res.render('sign', {
        message:message
    });
});

//getting user info from database
router.post('/login', function(req, res) {
    var user = req.body.user;
    var password = req.body.password;
    var selectQuery = "SELECT * FROM Register WHERE user = ?";
    connection.query(selectQuery, [user], function(error, results) {
        if (results.length == 1) {
            var match = bcrypt.compareSync(password, results[0].password);
            if (match == true) {
                res.redirect('/');
            }else {
                res.redirect('/sign?msg=badlogin');
            }
        }else {
            res.redirect('/sign?msg=badlogin');
        }
    })
})

module.exports = router;
