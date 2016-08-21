'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../../app/models/user.server.model');


module.exports = function () {
    passport.use('local-signup', new LocalStrategy({
            // fNameField:    'fName',
            // lNameField:    'lName',
            // usernameField: 'username',
            // passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done){
            process.nextTick(function(){
                User.findOne({'username': username}, function(err, user){
                    if(err)
                        return done(err);
                    if(user){
                        return done(null, false, req.flash('signupMessage', 'That email already taken'));
                    }
                    var newUser = new User();
                    newUser = req.body;
                    newUser.save(function(err){
                        if(err)
                            throw err;
                        return done(null, newUser);
                    });
                });

            });
        }));
};