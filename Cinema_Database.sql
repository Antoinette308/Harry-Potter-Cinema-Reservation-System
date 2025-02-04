-- CREATE DATABASE cinema_db;

USE cinema_db;

/* Create movies table
This table stores the title and release date of the movie. 
id is an auto increment primary key
*/
CREATE TABLE movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  release_date DATE
);

/* Create reservations table
This table stores the movie_id, showtime, num_seats, and total_price for each movie.
id is an auto increment primary key
*/
CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  movie_id INT,
  showtime DATETIME,
  num_seats INT,
  total_price DECIMAL(10, 2),
  FOREIGN KEY (movie_id) REFERENCES movies(id)
);

-- Insert data into the movies table. Checking that it inserts the data correctly. 
INSERT INTO movies (title, release_date) VALUES
('Harry Potter and the Philosopher\'s Stone', '2024-10-19');

-- Insert more data into the movies table
INSERT INTO movies (title, release_date) VALUES
('Harry Potter and the Chamber of Secrets', '2024-10-26'),
('Harry Potter and the Prisoner of Azkaban', '2024-11-02'),
('Harry Potter and the Goblet of Fire', '2024-11-09'),
('Harry Potter and the Order of the Phoenix', '2024-11-16'),
('Harry Potter and the Half-Blood Prince', '2024-11-23'),
('Harry Potter and the Deathly Hallows: Part 1', '2024-11-30'),
('Harry Potter and the Deathly Hallows: Part 2', '2024-12-07');
