import { gql } from "@apollo/client";
import { TOPPING_FIELDS } from "../toppings/fragments";

export const PIZZA_FIELDS = gql`
  ${TOPPING_FIELDS}
  fragment PizzaFields on Pizza {
    id
    pizza
    toppings {
      ...toppingFields
    }
    status
  }
`;
