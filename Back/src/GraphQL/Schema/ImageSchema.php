<?php
namespace App\GraphQL\Schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ImageSchema extends ObjectType {
    public function __construct() {
        $config = [
            'name' => 'Image',
            'fields' => [
                'id' => Type::id(),
                'url' => Type::string(),
            ]
        ];
        parent::__construct($config);
    }
}
