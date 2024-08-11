<?php
require_once __DIR__ . '/../vendor/autoload.php';
use App\Models\Order;
use App\Utils\Database;
use App\Models\Product;

Database::initialize();

function placeOrder($productId, $quantity)
{
    try {
        // Fetch product by ID to ensure it exists
        $product = Product::findOrFail($productId);

        // Example: Calculate total price based on product price and quantity
        $productPrice = $product->prices->first()->amount; // Assuming prices is a collection, get the first price
        $totalPrice = $productPrice * intval($quantity);

        // Example: Create a new order record
        $order = new Order();
        $order->product_id = $productId;
        $order->quantity = $quantity;
        $order->total_price = $totalPrice;

        // Save the order
        $order->save();

        return true; // Return true if order is successfully placed
    } catch (\Exception $e) {
        // Handle exceptions
        throw new \Exception('Failed to place order: ' . $e->getMessage());
    }
}

// Test the createOrder function
try {
    // Test the createOrder function
    $result = placeOrder('ps-5', 552);
    if ($result) {
        echo 'Order placed successfully!';
    } else {
        echo 'Failed to place order!';
    }
} catch (Exception $e) {
    // Output the error message
    echo 'Error: ' . $e->getMessage();
}
