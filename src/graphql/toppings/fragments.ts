import { gql } from "@apollo/client";

export const TOPPING_FIELDS = gql`
  fragment toppingFields on Topping {
    id
    topping
  }
`;
