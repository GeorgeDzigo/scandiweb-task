<?php
namespace App\GraphQL\Schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeSchema extends ObjectType {
    public function __construct() {
        $config = [
            'name' => 'Attribute',
            'fields' => [
                'id' => Type::id(),
                'name' => Type::string(),
                'value' => Type::string(),
                'displayValue' => Type::string(),   
            ]
        ];
        parent::__construct($config);
    }
}