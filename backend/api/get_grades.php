<?php
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    echo json_encode([
        'success' => false,
        'message' => 'Not logged in'
    ]);
    exit;
}

require_once '../config/db_config.php';

// Initialize response
$response = ['success' => false, 'message' => '', 'grades' => []];


$semestre = isset($_GET['semestre']) ? trim($_GET['semestre']) : '';

if (empty($semestre)) {
    $response['message'] = 'Semestre parameter is required';
    echo json_encode($response);
    exit;
}

try {
    $student_id = $_SESSION['student_id'];

    $stmt = $pdo->prepare("
        SELECT 
            module,
            note,
            status
        FROM grades 
        WHERE student_id = ? AND semestre = ?
        ORDER BY module
    ");

    $stmt->execute([$student_id, $semestre]);

    $grades = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($grades) > 0) {
        $response['success'] = true;
        $response['grades'] = $grades;
        $response['total'] = count($grades);
    } else {
        $response['message'] = 'Aucune note trouvée pour ce semestre';
    }
} catch (PDOException $e) {
    $response['message'] = 'Database error';
    error_log('Grades API error: ' . $e->getMessage());
}

// Send response back to JavaScript
echo json_encode($response);

?>
