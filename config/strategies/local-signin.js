'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../../app/models/user.server.model');


module.exports = function () {
    passport.use('local-signin', new LocalStrategy({
            // usernameField: 'username',
            // passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {
            process.nextTick(function () {
                User.findOne({ 'username' : username }, function (err, user) {
                    if (err) { return done(err); }
                    if (!user) { return done(null, false, req.flash('signinMessage', 'user name is not exists')); }
                    if (!user.authenticate(password))
                    // if (user.local.password !== password)
                        return done(null, false, req.flash('signinMessage', "Invalid password"));
                    return done(null, user);
                });
            });
        }
    ));
};