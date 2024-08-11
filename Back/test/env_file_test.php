<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

// Load environment variables from .env file
$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

echo "DB_HOST: " . $_ENV['DB_HOST'] . "\n";