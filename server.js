
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const expressFormData = require('express-form-data');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecret = process.env.JWT_SECRET;

const passportJwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
}

const passportJwt = (passport) => {
    passport.use(
        new JwtStrategy(
            passportJwtOptions,
            (jwtPayload, done) => {

                // Tell passport what to do with payload
                UserModel
                .findOne({ _id: jwtPayload._id })
                .then(
                    (dbDocument) => {
                        // The done() function will pass the 
                        // dbDocument to Express. The user's 
                        // document can then be access via req.user
                        return done(null, dbDocument)
                    }
                )
                .catch(
                    (err) => {
                        // If the _id or anything is invalid,
                        // pass 'null' to Express.
                        if(err) {
                            console.log(err);
                        }
                        return done(null, null)
                    }
                )

            }
        )
    )
};
passportJwt(passport);

const server = express();
server.use( express.urlencoded({ extended: false }) );
server.use( express.json() );
server.use( cors() );
server.use( expressFormData.parse() );
const mongoose = require('mongoose');

// Import the Model
const userRoutes = require('./routes/user-routes.js');
const userToSeasonRoutes = require('./routes/user_to_season_routes.js');
const connectionString = process.env.MONGODB_CONNECTION_STRING;

const connectionConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose
.connect(connectionString, connectionConfig)  // returns Promise
.then(
    () => {
        console.log('DB is connected');
    }
)
.catch(
    (dbError) => {
        console.log('error occurred', dbError);
    }
);

cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
    }
);

server.use('/users', userRoutes);

server.use('/userscomment',userToSeasonRoutes);



// The .listen() will connect the server
// to an available Port
// server.listen(portNumber, callbackFunction)
server.listen(
    // Check the Environment Variable for PORT otherwise use 3001
    process.env.PORT || 3001,
    () => {
        console.log('Server is running on http://localhost:3001/');
    }
);