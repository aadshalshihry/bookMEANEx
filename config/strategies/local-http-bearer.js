'use strict';

var passport = require('passport'),
    bearerStrategy = require('passport-http-bearer').Strategy,
    User = require('../../app/models/user.server.model');


module.exports = function () {
    passport.use('local-http-bearer', new bearerStrategy({},
        function(token, done) {
            User.findOne({ token: token }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                return done(null, user);
            });
        }
    ));
};