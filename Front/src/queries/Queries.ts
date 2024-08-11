import { gql } from '@apollo/client';

export const PRODUCTS_BY_CATEGORY_QUERY = gql`
  query ProductsByCategory($categoryName: String!) {
    productsByCategory(categoryName: $categoryName) {
      id
      name
      in_stock
      description
      brand
      category {
        id
        name
      }
      images {
        id
        url
      }
      attributes {
        id
        name
        value
        displayValue
      }
      prices {
        id
        amount
        currency
      }
    }
  }
`;

export const PRODUCTS_BY_ID_QUERY = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      in_stock
      description
      brand
      category {
        id
        name
      }
      images {
        id
        url
      }
      attributes {
        id
        name
        value
        displayValue
      }
      prices {
        id
        amount
        currency
      }
    }
  }
`;

export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($productId: ID!, $quantity: Int!, $attributes: String) {
    createOrder(productId: $productId, quantity: $quantity, attributes: $attributes) {
      success
      message
      order {
        id
        product_id
        product_name
        quantity
        price
        total_price
        attributes
        image_url
        created_at
      }
    }
  }
`;