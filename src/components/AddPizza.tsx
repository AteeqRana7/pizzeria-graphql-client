import { useQuery, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

import { GET_PIZZAS } from "../graphql/pizzas/queries";
import { CREATE_PIZZA } from "../graphql/pizzas/mutations";
import { GET_TOPPINGS } from "../graphql/toppings/queries";
import { Topping } from "../graphql/toppings/types";

import PizzaForm from "./PizzaForm";
import { PizzaStatus } from "../graphql/pizzas/types";

const AddPizza = () => {
  const { data, loading, error } = useQuery(GET_TOPPINGS);
  const [createPizza, { loading: mutationLoading, error: mutationError }] =
    useMutation(CREATE_PIZZA, { refetchQueries: [GET_PIZZAS, "AllPizzas"] });
  const navigate = useNavigate();

  if (loading) {
    return <div>Fetching toppings...</div>;
  }

  if (error) {
    return (
      <>
        <div>Opps, dropped the flavours while fetching</div>
        <div>{error.message}</div>
      </>
    );
  }

  if (!data.toppings.length) {
    return <div>Opps!, no toppings found, kindly restock!</div>;
  }

  if (mutationLoading) {
    return <div>Making new pizza...</div>;
  }

  if (mutationError) {
    return (
      <>
        <div>Opps, dropped the pizza on floor while cooking</div>
        <button
          onClick={() => {
            navigate(0);
          }}
        >
          Back
        </button>
      </>
    );
  }

  const addPizza = async (pizza: string, toppingID: string, status: string) => {
    await createPizza({
      variables: {
        pizza,
        status,
        toppings: [{ id: parseInt(toppingID ?? "0") }],
      },
    });
    if (!mutationError) {
      navigate("/pizzas");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <header style={{ display: "flex", alignItems: "center" }}>
        <Link to='/pizzas'>Back</Link>
        <h1>Add Pizza</h1>
      </header>
      <PizzaForm
        pizza=''
        status={PizzaStatus.AVAILABLE}
        toppingID='1'
        toppingsLength={data.toppings.length}
        onSubmit={addPizza}
      />
      <div style={{ backgroundColor: "#1a1a1a", margin: "2rem 0" }}>
        <h3>Available Toppings</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "1000px",
            justifyContent: "center",
          }}
        >
          {data.toppings.map((topping: Topping) => (
            <ul
              style={{
                margin: "1rem",
                backgroundColor: "#292929",
                padding: "1rem",
                listStyle: "none",
              }}
              key={`${topping.id}-topping`}
            >
              <li style={{ textTransform: "capitalize" }}>ID: {topping.id}</li>
              <li style={{ textTransform: "capitalize" }}>
                Topping: {topping.topping}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddPizza;
