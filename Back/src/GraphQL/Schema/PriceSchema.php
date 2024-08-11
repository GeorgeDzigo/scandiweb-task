<?php
namespace App\GraphQL\Schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class PriceSchema extends ObjectType {
    public function __construct() {
        $config = [
            'name' => 'Price',
            'fields' => [
                'id' => Type::id(),
                'amount' => Type::float(),
                'currency' => Type::string(),
            ]
        ];
        parent::__construct($config);
    }
}