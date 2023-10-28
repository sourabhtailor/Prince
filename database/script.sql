-- Create a new database
CREATE DATABASE myappdb;

-- Switch to the new database
USE myappdb;

-- Create a table for user data
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(100)
);

-- Insert initial data
INSERT INTO users (username, email) VALUES
  ('user1', 'user1@example.com'),
  ('user2', 'user2@example.com');

