import { gql } from "@apollo/client";

import { PIZZA_FIELDS } from "./fragments";

export const GET_PIZZAS = gql`
  ${PIZZA_FIELDS}
  query AllPizzas($pizza: String) {
    pizzas(name: $pizza) {
      ...PizzaFields
    }
  }
`;

export const GET_PIZZA_BY_ID = gql`
  ${PIZZA_FIELDS}
  query GetPizza($pizzaId: Int!) {
    pizza(id: $pizzaId) {
      ...PizzaFields
    }
  }
`;
