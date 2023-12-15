import { useState, useEffect, useRef } from "react";
import { IPizzaDetails, PizzaStatus } from "../graphql/pizzas/types";

interface PropsPizzaForm {
  pizza: string;
  toppingID: string;
  status: PizzaStatus;
  toppingsLength: number;
  onSubmit: (pizza: string, toppingID: string, status: string) => void;
}

const PizzaForm = ({
  pizza = "",
  toppingID = "1",
  status = PizzaStatus.AVAILABLE,
  toppingsLength = 0,
  onSubmit,
}: PropsPizzaForm) => {
  const [pizzaDetails, setPizzaDetails] = useState<IPizzaDetails>();
  const statusRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    setPizzaDetails({
      pizza,
      status: String(status),
      toppings: [{ id: parseInt(toppingID) }],
    });
  }, [pizza, toppingID, status]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(
          event.target.pizza.value,
          event.target.toppingID.value,
          statusRef.current?.value ?? ""
        );
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        width: "300px",
        gap: "10px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <label htmlFor='pizza'>Name</label>
        <input
          type='text'
          name='pizza'
          defaultValue={pizzaDetails?.pizza}
          required
          style={{ width: "150px" }}
        />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <label htmlFor='pizza'>Topping ID</label>
        <input
          type='number'
          name='toppingID'
          required
          defaultValue={pizzaDetails?.toppings && pizzaDetails?.toppings[0].id}
          min={"1"}
          max={`${toppingsLength}`}
          style={{ width: "150px" }}
        />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <label htmlFor='pizza'>Status</label>
        <select
          ref={statusRef}
          defaultValue={pizzaDetails?.status}
          required
          style={{ width: "150px" }}
        >
          <option value='AVAILABLE'>Available</option>
          <option value='COOKING'>Cooking</option>
          <option value='UNAVAILABLE'>Unavailable</option>
        </select>
      </div>
      <div>
        <button type='submit' style={{ backgroundColor: "#646cff" }}>
          Process
        </button>
        <button type='reset' style={{ backgroundColor: "#ff0000" }}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default PizzaForm;
