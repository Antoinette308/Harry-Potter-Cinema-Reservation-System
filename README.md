# Harry Potter Movie Marathon API 

## About

I made a Harry Potter Movie Mararthon API 🧙‍♂️🧹. Here, a cinema will play the Harry Potter movies in chronological order over 8 consecutive weekends. The first screening begins 19th October 2024 with Harry Potter and the Philosopher's Stone, and concludes on the 7th December 2024 with Harry Potter and the Deathly Hallows: Part 2.

## Features 

My API is designed so that users can: 
- View all of the available Harry Potter movies over the 8 weekends 

- Make reservations for Harry Potter movie screenings

- See how many seats are available for specific movie times

### Installation requirements 
- Node.js
- npm
- MySQL 

### Set up Instructions 

1. Clone the repository and navigate to the project folder

2. Install the required dependencies

```
npm install express mysql2 dotenv body-parser
```

- express: for bulding the API 
- mysql2: to interact with MySQL
- dotenv: for loading environment variables
- body-parser: for parsing incoming requests

3. Set up the .env file
- Create a .env file at the root of the project and add your MySQL credentials

```
    DB_HOST=localhost

    DB_USER=root

    DB_PASSWORD=your_password

    DB_NAME=cinema_db
```

4. Start your MySQL and run the SQL scripts to create the cinema_db database and the movies and reservations tables.

5. Run the server 

```
    npm start 
```

### Endpoints for Harry Potter Movie Marathon API

1. Get all the available Harry Potter movies over the 8 weekends 

- http://localhost:3000/movies

- Result: 

![GET_movies](https://github.com/user-attachments/assets/27df08e7-5a7b-4192-b34b-fa2eca9c8995)

2. Make reservations for Harry Potter movie screenings

- URL endpoint in Postman: http://localhost:3000/reservations

- JSON: 

```
    {
    "movie_id": 1,
    "showtime": "2024-10-19 14:00",
    "num_seats": 2
    }
```

- Result:

![POST reservations](https://github.com/user-attachments/assets/cd273928-55f6-4daf-bd96-cbf5d6c33c38)

```
{
    "movie_id": 3, 
    "showtime": "2024-11-02 14:00", 
    "num_seats": 7
}
```

- Result:

![POST_reservations](https://github.com/user-attachments/assets/c8c7454b-16c2-443e-bbd1-d86a059911bb)


3. See how many seats are available for specific show times

- // http://localhost:3000/seats?movie_id=1&showtime=2024-10-19 14:00

   
- Result:

![GET_seats](https://github.com/user-attachments/assets/c99258f0-c2ff-4538-b043-3deb6d60baad)
