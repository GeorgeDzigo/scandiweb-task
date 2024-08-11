<?php

namespace App\Controller;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\GraphQL as GraphQLQuery;
use GraphQL\Type\Schema;

class GraphQL
{
    static public function handle()
    {
        $productType = new \App\GraphQL\Schema\ProductSchema();

        $queryType = new ObjectType([
            'name' => 'Query',
            'fields' => [
                'product' => [
                    'type' => $productType,
                    'args' => [
                        'id' => ['type' => Type::id()],
                    ],
                    'resolve' => function ($root, $args, $context, $info) {
                        return \App\GraphQL\Resolvers\ProductResolver::resolve($root, $args, $context, $info);
                    },
                ],
                
                'productsByCategory' => [
                    'type' => Type::listOf($productType),
                    'args' => [
                        'categoryName' => ['type' => Type::string()],
                    ],
                    'resolve' => function ($root, $args, $context, $info) {
                        if ($args['categoryName'] === 'all') {
                            return \App\GraphQL\Resolvers\ProductResolver::getAllProducts();
                        } else {
                            return \App\GraphQL\Resolvers\ProductResolver::productsByCategory($root, $args, $context, $info);
                        }
                    },
                ]               
            ],
        ]);
        
        $mutationType = new ObjectType([
            'name' => 'Mutation',
            'fields' => [
                'createOrder' => [
                    'type' => new ObjectType([
                        'name' => 'CreateOrderResponse',
                        'fields' => [
                            'success' => ['type' => Type::nonNull(Type::boolean())],
                            'message' => ['type' => Type::nonNull(Type::string())],
                            'order' => ['type' => new \App\GraphQL\Schema\OrderSchema()],
                        ],
                    ]),
                    'args' => [
                        'productId' => ['type' => Type::nonNull(Type::id())],
                        'quantity' => ['type' => Type::nonNull(Type::int())],
                        'attributes' => ['type' => Type::string()], // Adjust the type based on how you handle attributes
                    ],
                    'resolve' => function ($root, $args) {
                        return \App\GraphQL\Resolvers\OrderResolver::createOrder($args);
                    },
                ],
            ],
        ]);

        $schema = new Schema([
            'query' => $queryType,
            'mutation' => $mutationType
        ]);

        $rawInput = file_get_contents('php://input');
        $input = json_decode($rawInput, true);
        $query = $input['query'];
        $variableValues = isset($input['variables']) ? $input['variables'] : null;

        try {
            $rootValue = ['prefix' => 'You said: '];
            $result = GraphQLQuery::executeQuery($schema, $query, $rootValue, null, $variableValues);
            $output = $result->toArray();
        } catch (\Exception $e) {
            $output = [
                'errors' => [
                    [
                        'message' => $e->getMessage()
                    ]
                ]
            ];
        }
        header('Content-Type: application/json');
        echo json_encode($output, JSON_THROW_ON_ERROR);
    }
}
