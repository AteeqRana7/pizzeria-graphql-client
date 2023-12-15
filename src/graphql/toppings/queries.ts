import { gql } from "@apollo/client";
import { TOPPING_FIELDS } from "./fragments";

export const GET_TOPPINGS = gql`
  ${TOPPING_FIELDS}
  query GetToppings {
    toppings {
      ...toppingFields
    }
  }
`;
