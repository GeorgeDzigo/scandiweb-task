<?php
require_once __DIR__ . '/../vendor/autoload.php'; // Include Composer's autoloader

use App\Utils\Database;
use Illuminate\Database\Capsule\Manager as Capsule;

// Test the database connection
try {
    // Initialize the database connection
    Database::initialize();
    
    // Get the database connection
    $connection = Capsule::connection();

    // Output the connection status
    echo 'Connected to the database successfully!';
} catch (Exception $e) {
    // Output the error message
    echo 'Error: ' . $e->getMessage();
}