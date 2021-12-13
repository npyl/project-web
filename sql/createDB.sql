-- Δημιουργούμε τον χρήστη admin (που θα έχει πλήρη δικαιώματα μέσα στη βάση)
CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY '123';

-- Δημιουργούμε τη βάση (ταυτόχρονα, πετώντας την παλιά)
DROP DATABASE IF EXISTS db;
CREATE DATABASE db;
USE db;

-- Σιγουρευόμαστε ότι ο χρήστης admin έχει πρόσβαση στο νέο database που φτιάξαμε
-- https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql
GRANT INSERT ON db.* TO 'admin'@'localhost';
GRANT SELECT ON db.* TO 'admin'@'localhost';

-- Δημιουργούμε τον πίνακα με τους χρήστες της βάσης
DROP TABLE IF EXISTS users;
CREATE TABLE users(
    name        VARCHAR(25) NOT NULL,
    email       VARCHAR(25) NOT NULL,
    password    VARCHAR(25) NOT NULL,
    type        VARCHAR(25) NOT NULL,

    PRIMARY KEY(name)
);

-- Προσθέτουμε στοιχεία στους πίνακες
INSERT INTO users(name, email, password, type) VALUES
('npyl',        'n.pylarinos@hotmail.com',  'A123abcd',     'admin'),
('ulc',         'ulcheats@gmail.com',       'B456abcd',     'user'),
('abc',         'pylarinosnick@gmail.com',  'C789abcd',     'user'),
('zeosleus',    'zeosleous@gmail.com',      'D010abcd',     'user'),
('dd',          'dd@gmail.com',             'E011abcd',     'user');