<?php
namespace App\Utils;

use Illuminate\Database\Capsule\Manager as Capsule;
use Dotenv\Dotenv;

require_once __DIR__ . '/../../vendor/autoload.php';

$dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

class Database
{
    public static function initialize()
    {
        $capsule = new Capsule;
        $capsule->addConnection([
            'driver' => 'mysql',
            'host' => $_ENV['DB_HOST'],
            'database' => $_ENV['DB_DATABASE'],
            'username' => $_ENV['DB_USERNAME'],
            'password' => $_ENV['DB_PASSWORD'],
            'post' => $_ENV['DB_PORT']
        ]);

        $capsule->setAsGlobal();

        // Setup the Eloquent ORM
        $capsule->bootEloquent();
    }
}