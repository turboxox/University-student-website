CREATE TABLE
    users (
        student_id INT PRIMARY KEY NOT NULL,
        prenom VARCHAR(20) NOT NULL,
        nom VARCHAR(20) NOT NULL,
        filiere VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        tel VARCHAR(15) UNIQUE NOT NULL,
        semestre VARCHAR(2) NOT NULL,
        cin VARCHAR(20) UNIQUE NOT NULL,
        cne VARCHAR(20) UNIQUE NOT NULL,
        ldn VARCHAR(15) NOT NULL
    );

CREATE TABLE
    grades (
        grade_id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        semestre VARCHAR(10) NOT NULL,
        module VARCHAR(100) NOT NULL,
        note DECIMAL(5, 2) NOT NULL,
        status ENUM ('V', 'NV', 'RATT') NOT NULL,
        FOREIGN KEY (student_id) REFERENCES users (student_id) ON DELETE CASCADE
    );