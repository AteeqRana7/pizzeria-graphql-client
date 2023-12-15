import { PizzaStatus } from "../graphql/pizzas/types";
import { Topping } from "../graphql/toppings/types";

interface PropsPizzaDetails {
  pizza: string;
  status: PizzaStatus;
  toppings: Topping[];
}

const PizzaDetails = ({ pizza, status, toppings }: PropsPizzaDetails) => {
  return (
    <ul style={{ margin: "3rem" }}>
      <li style={{ textTransform: "capitalize" }}>Name: {pizza}</li>
      <li style={{ textTransform: "capitalize" }}>Status: {status}</li>
      {toppings.map((topping) => (
        <li key={topping.id} style={{ textTransform: "capitalize" }}>
          Topping: {topping.topping}
        </li>
      ))}
    </ul>
  );
};

export default PizzaDetails;
