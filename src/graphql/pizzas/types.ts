import { Topping } from "../toppings/types";

export interface IPizza {
  id?: string;
  pizza: string;
  toppings: Topping[];
  status: PizzaStatus;
  __typename?: string;
}

export interface IPizzaDetails {
  pizza?: string;
  toppings?: { id: number }[];
  status?: string;
}

export enum PizzaStatus {
  AVAILABLE,
  COOKING,
  UNAVAILABLE,
}
