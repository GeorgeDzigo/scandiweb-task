<?php
// OrderSchema class

namespace App\GraphQL\Schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderSchema extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'Order',
            'fields' => [
                'id' => Type::nonNull(Type::id()),
                'product_id' => Type::nonNull(Type::id()),
                'product_name' => Type::nonNull(Type::string()),
                'quantity' => Type::nonNull(Type::int()),
                'price' => Type::nonNull(Type::float()), // Add this if storing individual price
                'total_price' => Type::nonNull(Type::float()),
                'attributes' => Type::string(), // Adjust type if using JSON or other serialization
                'image_url' => Type::string(),
                'created_at' => [
                    'type' => Type::nonNull(Type::string()),
                    'resolve' => function ($root, $args) {
                        return date('d-M-Y', strtotime($root->created_at));
                    }
                ],
            ]
        ];
        parent::__construct($config);
    }
}

