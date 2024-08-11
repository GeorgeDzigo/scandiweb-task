<?php
namespace App\GraphQL\Resolvers;

use App\Models\Product;
use Throwable;
use App\Utils\Database;
use App\Models\Category;

Database::initialize();
class ProductResolver
{
    public static function resolve($root, $args, $context, $info)
    {
        try {
            $product = Product::with(['category', 'images', 'attributes', 'prices'])->find($args['id']);
            if (!$product) {
                throw new \Exception('Product not found');
            }
            // Map attributes to match the structure expected by GraphQL
            $product->attributes = $product->attributes->map(function ($attribute) {
                return [
                    'id' => $attribute->id,
                    'name' => $attribute->attribute_name,
                    'value' => $attribute->attribute_value,
                    'displayValue' => $attribute->display_value
                ];
            })->toArray();
            return $product;
        } catch (Throwable $e) {
            error_log($e->getMessage());
            error_log($e->getTraceAsString());
            throw $e;
        }
    }
    public static function productsByCategory($root, $args, $context, $info)
    {
        try {
            $category = Category::where('name', $args['categoryName'])->first();
            $categoryId = $category->id;

            // Fetch products based on category ID
            $products = Product::where('category_id', $categoryId)
                ->with(['category', 'images', 'attributes', 'prices'])
                ->get();

            // Map attributes for each product
            $products->each(function ($product) {
                $product->attributes = $product->attributes->map(function ($attribute) {
                    return [
                        'id' => $attribute->id,
                        'name' => $attribute->attribute_name,
                        'value' => $attribute->attribute_value,
                    ];
                })->toArray();
            });

            return $products;
        } catch (Throwable $e) {
            error_log($e->getMessage());
            error_log($e->getTraceAsString());
            throw $e;
        }
    }
    public static function getAllProducts()
    {
        try {
            // Fetch all products without filtering by category
            $products = Product::with(['category', 'images', 'attributes', 'prices'])->get();

            // Map attributes for each product
            $products->each(function ($product) {
                $product->attributes = $product->attributes->map(function ($attribute) {
                    return [
                        'id' => $attribute->id,
                        'name' => $attribute->attribute_name,
                        'value' => $attribute->attribute_value,
                    ];
                })->toArray();
            });

            return $products;
        } catch (Throwable $e) {
            error_log($e->getMessage());
            error_log($e->getTraceAsString());
            throw $e;
        }
    }

}
