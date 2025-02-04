const express = require('express'); // Use the require method to import the express library and use it
const mysql = require('mysql2'); // Import the mysql2 library 
const bodyParser = require('body-parser'); // Import the body-parser library
const dotenv = require('dotenv'); // Import the dotenv library

dotenv.config(); // This line loads environment variables from my .env file 

const app = express(); // Initialises a new express application
app.use(bodyParser.json()); // Is a middleware that tells the app to parse incoming requests with JSON payloads.

// Create a MySQL connection pool to connect my API to MySQL database 'Cinema_Database'
const pool = mysql.createPool({
    host: process.env.DB_HOST,      // MySQL server host
    user: process.env.DB_USER,      // MySQL user
    password: process.env.DB_PASSWORD,  // MySQL password
    database: process.env.DB_NAME   // MySQL database name
  });



  // Arrow function for error handling middleware
  app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message }); // If there is an error, then return status code (500) for server error and the error message
  });

// Start the server
// http://localhost:3000/
const PORT = process.env.PORT || 3000; // Set PORT to the environment variable PORT, otherwise use 3000 if it's not defined
app.listen(PORT, () => {     // Referencing the app that calls the express method, to use it's listen method to listen out for PORT 3000
  console.log(`Server is running on port ${PORT}`); // Print a message stating the port the server is running on
});


// Using the express framework to get a home route 
app.get('/', (req, res) => {    // Setting up a route for the website using default endpoint '/'. Callback function with 2 parameters request and response. 
    res.send('Welcome to my API!');    // Send a welcome message as a response
});

// Get all available movies 
// http://localhost:3000/movies
app.get('/movies', (req, res) => {  // callback function with request and response
    const sql = 'SELECT * FROM movies'; // Use the Select all query to select all data from movies table
    pool.query(sql, (err, data) => { // Execute the sql query and return either an error or the data
        if (err) return res.status(500).json({ error: 'Error fetching movies' });   // If there is an error, return status code 500 and error message 'Error fetching movies'
            return res.status(200).json({ movies: data });  // Otherwise, return the data as response.json 
    });
});



// Request to make a movie reservation through a POST route via Postman
// http://localhost:3000/reservations
app.post('/reservations', (req, res) => {   
    const { movie_id, showtime, num_seats } = req.body; // Destructuring to get movie_id, showtime and num_seats from the request body
    if (!movie_id || !showtime || !num_seats) {         // Validate the request by checking that all the query parameters (required information) is inputted
      return res.status(400).json({ error: 'Invalid reservation data' });   // If any of the required information is missing, return status code 400 and error message 'Invalid reservation data'
    }

    // Setting the price for one seat at £15.00
    const pricePerSeat = 15.00;
    // Calculate the total price by multiplying the number of seats by the price per seat
    const total_price = num_seats * pricePerSeat;
  
    // Defining an SQL query to save the reservation data into the reservations table
    const query = 'INSERT INTO reservations (movie_id, showtime, num_seats, total_price) VALUES (?, ?, ?, ?)';
    
    // Execute the SQL query to save the reservation into the reservations table. 
    pool.query(query, [movie_id, showtime, num_seats, total_price], (err, result) => {
      if (err) return res.status(500).json({ error: 'Error making reservation' }); // If there is an error when trying to execute the query, return status code 500 with an error message 'Error making reservation'
      res.status(201).json({ message: 'Reservation successful', total_price });     // If query is successful, then return status code 201 with a reservation successful message and the total price
    });
  });



// Get available seats for specific showtimes
// http://localhost:3000/seats?movie_id=1&showtime=2024-10-19 14:00
// This will show you the total available seats for Harry Potter and the Philosopher's Stone on '2024-10-19' at '14:00'
app.get('/seats', (req, res) => { 
    const { movie_id, showtime } = req.query;     // Destructuring to get movie_id and showtime from the request body 
    if (!movie_id || !showtime) {                 // Validate the request by checking that all the query parameters are inputted
      return res.status(400).json({ error: 'Invalid data' });   // If either parameter is missing, then return status 400 and an error message 'Invalid data'
    }
  
    // sql query to get the number of seats already reserved for the movie and showtime from the reservations table
    const query = 'SELECT num_seats FROM reservations WHERE movie_id = ? AND showtime = ?';

    // Execute the sql query
    pool.query(query, [movie_id, showtime], (err, results) => { // Callback function with 2 parameters. Will respond with either err or the results
      if (err) return res.status(500).json({ error: 'Error fetching seats' }); // If there is an error with the query, then return status code 500 and an error message 'Error fetching seats'
  
      // There will be 50 seats available in total for each movie screening. 
      // The "results.reduce()" goes through the resuts array, containing all the reservations for the movie and showtimes, and adds up all the reserved seats. 
      const availableSeats = 50 - results.reduce((total, reservation) => total + reservation.num_seats, 0); // Adds up the Number of seats from each reservation to get the total number of seats already reserved. This total is subtracted from 50 to get the total number of avaiable seats
      res.status(200).json({ available_seats: availableSeats }); // If the query is successful, then return status code 200 and the total available seats as json
    });
  });
  
  




