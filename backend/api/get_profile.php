<?php

session_start();
require_once('../config/db_config.php');
header('Content-type: application/json');

//make sur again if theuser logged in
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    //if note logged in send error
    echo json_encode([
        'success' => false,
        'message' => 'not logged in'
    ]);
    exit;
}

try {
    $student_id = $_SESSION['student_id'];
    $stmt = $pdo->prepare("
    SELECT
        student_id,
        prenom,
        nom,
        filiere,
        email,
        tel,
        semestre,
        cin,
        cne,
        ldn
        FROM users
        WHERE student_id=?
        ");
        
    $stmt->execute([$student_id]); //replace ? with student_id
    $user = $stmt->fetch(PDO::FETCH_ASSOC); //fetch the result as one column
    // Check if user was found
    if ($user) {
        // Send success response with user data
        echo json_encode([
            'success' => true,
            'user' => $user
        ]);
    } else {
        // Student ID not found in database
        echo json_encode([
            'success' => false,
            'message' => 'User not found'
        ]);
    }
} catch (PDOException $e) {
    // Database error occurred
    echo json_encode([
        'success' => false,
        'message' => 'Database error'
    ]);

    error_log('Profile API error: ' . $e->getMessage());
}
