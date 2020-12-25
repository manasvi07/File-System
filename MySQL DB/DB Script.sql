create schema filesystem;
CREATE TABLE filesystem.user_details (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) );
    
CREATE TABLE filesystem.file_hierarchy (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    file_and_folder VARCHAR(100),
    parent_name VARCHAR(100) , 
    url VARCHAR(100) );