import { gql } from "@apollo/client";

import { PIZZA_FIELDS } from "./fragments";

export const CREATE_PIZZA = gql`
  ${PIZZA_FIELDS}
  mutation CreatePizza(
    $toppings: [ToppingInput!]!
    $pizza: String!
    $status: PizzaStatus!
  ) {
    createPizza(toppings: $toppings, pizza: $pizza, status: $status) {
      ...PizzaFields
    }
  }
`;

export const DELETE_PIZZA = gql`
  mutation DeletePizza($deletePizzaId: Int!) {
    deletePizza(id: $deletePizzaId)
  }
`;

export const UPDATE_PIZZA = gql`
  mutation UpdatePizza(
    $id: Int!
    $pizza: String
    $toppings: [ToppingInput]
    $status: PizzaStatus
  ) {
    updatePizza(id: $id, pizza: $pizza, toppings: $toppings, status: $status) {
      id
      pizza
      status
      toppings {
        topping
      }
    }
  }
`;
