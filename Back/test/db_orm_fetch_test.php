<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Utils\Database;
use App\Models\Product;

Database::initialize();

try {
    $productId = 'ps-5';
    $product = Product::with('category', 'images', 'attributes', 'prices')->find($productId);

    if ($product) {
        echo "Product: " . $product->name . "\n";
        echo "Category: " . $product->category->name . "\n";
        echo "Images: " . $product->images->pluck('url')->implode(', ') . "\n";
        echo "Attributes: " . $product->attributes->pluck('attribute_value', 'attribute_name')->map(function ($value, $name) {
            return $name . ' -> ' . $value;
        })->implode(', ') . "\n";
        echo "Prices: " . $product->prices->pluck('amount', 'currency')->map(function ($amount, $currency) {
            return $amount . ' ' . $currency;
        })->implode(', ') . "\n";
    } else {
        echo "Product with ID $productId not found.\n";
    }

} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
