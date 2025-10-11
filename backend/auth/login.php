<?php
session_start();
header('Content-Type: application/json');

require_once '../config/db_config.php';

$input = json_decode(file_get_contents('php://input'), true);

$response = ['success' => false, 'message' => ''];

// Validate input exists
if (!isset($input['email']) || !isset($input['password'])) {
    $response['message'] = 'Email and password are required';
    echo json_encode($response);
    exit;
}

$email = trim($input['email']);
$password = $input['password'];

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response['message'] = 'Invalid email format';
    echo json_encode($response);
    exit;
}

try {
    // Find user by email
    $stmt = $pdo->prepare("
    SELECT 
        student_id, 
        prenom, 
        nom, 
        email, 
        password_hash, 
        filiere, 
        semestre 
    FROM users 
    WHERE email = ?
");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        // Password is correct - create session
        $_SESSION['user_id'] = $user['student_id'];
        $_SESSION['student_id'] = $user['student_id'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['prenom'] = $user['prenom'];
        $_SESSION['nom'] = $user['nom'];
        $_SESSION['full_name'] = $user['prenom'] . ' ' . $user['nom'];
        $_SESSION['filiere'] = $user['filiere'];
        $_SESSION['semestre'] = $user['semestre'];
        $_SESSION['logged_in'] = true;

        $response['success'] = true;
        $response['message'] = 'Login successful';
        $response['user'] = [
            'student_id' => $user['student_id'],
            'full_name' => $user['prenom'] . ' ' . $user['nom'],
            'filiere' => $user['filiere']
        ];
    } else {
        $response['message'] = 'Invalid email or password';
    }
} catch (PDOException $e) {
    $response['message'] = 'Database error occurred';
    error_log($e->getMessage());
}

echo json_encode($response);
