<?php
session_start();

// Check if user is logged in
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    // Not logged in - redirect to login page
    header('Location: ../public/login.html');
    exit;
}


$_SESSION['last_activity'] = time();
?>