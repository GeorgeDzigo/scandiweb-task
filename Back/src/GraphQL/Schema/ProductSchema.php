<?php
namespace App\GraphQL\Schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ProductSchema extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'Product',
            'fields' => [
                'id' => Type::id(),
                'name' => Type::string(),
                'in_stock' => Type::boolean(),
                'brand' => Type::string(),
                'description' => Type::string(),
                'category' => new CategorySchema(),
                'images' => Type::listOf(new ImageSchema()),
                'attributes' => Type::listOf(new AttributeSchema()),
                'prices' => Type::listOf(new PriceSchema()),
            ]
        ];
        parent::__construct($config);
    }
}