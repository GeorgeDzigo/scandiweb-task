<?php
namespace App\GraphQL\Schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CategorySchema extends ObjectType {
    public function __construct() {
        $config = [
            'name' => 'Category',
            'fields' => [
                'id' => Type::id(),
                'name' => Type::string(),
            ]
        ];
        parent::__construct($config);
    }
}
