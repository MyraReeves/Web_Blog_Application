// Import the necessary dependencies
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


// Create a container to hold the functionalities of the Express app
const app = express();


// Middleware - Ensures proper data structure
app.use(express.json());
app.use(  (req, res, next) => {
    console.log(req.path, req.method);
    if (req.body) {
        console.log('Request body:');
        console.log(req.body);
    }
    next();
});



// Add the routes with the "use" method, accepting the api end point and importing the routes
    // Add the route for the blog posts
app.use('/api/posts/', require('./src/routes/BlogPost'));
    // Add the route for the users:
app.use('/api/users/', require('./src/routes/userRoute'));



// Connect to the database (which is MongoDB, in this case), making sure it's in accordance with the connection standards
mongoose
    .connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})

    // Check for a successful connection:
    .then(   () => {console.log('Successfully connected to MongoDB');}   )
    .catch(  (error) => {console.log('An error occurred when attempting to connect to MongoDB:', error.message);}    );



// Step 5: Create a port to place inside of the env so that you can start the server.  Include a hard-coded alternative just in case it can't connect to the one you created.
const port = process.env.port || 4000;
app.listen(port, 
    () => {console.log(`The server is running on port ${port}`);});