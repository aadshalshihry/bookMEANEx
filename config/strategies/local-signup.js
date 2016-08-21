'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../app/models/user.server.model');


module.exports = function () {
    passport.use('local-signup', new LocalStrategy({
            passReqToCallback: true
        },
        function(req, username, password, done){
            process.nextTick(function(){
                User.findOne({'username': username}, function(err, user){
                    if(err)
                        return done(err);
                    else if(user){
                        return done(null, false, req.flash('signupMessage', 'That email already taken'));
                    } else {
                        var newUser = new User(req.body);
                        // newUser = req.body;
                        if(req.body.admin){
                            newUser.admin = true;
                        }
                        newUser.save(function(err){
                        if(err)
                            throw err;
                            return done(null, newUser);
                        });
                    }
                });

            });
        }));
};