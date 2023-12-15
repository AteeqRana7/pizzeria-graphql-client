import { useQuery, useMutation } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";

import { GET_PIZZA_BY_ID } from "../graphql/pizzas/queries";
import { UPDATE_PIZZA } from "../graphql/pizzas/mutations";
import { GET_TOPPINGS } from "../graphql/toppings/queries";
import { Topping } from "../graphql/toppings/types";

import PizzaForm from "./PizzaForm";

const UpdatePizza = () => {
  const params = useParams();
  const {
    data: pizzaData,
    loading: pizzaLoading,
    error: pizzaError,
    refetch,
  } = useQuery(GET_PIZZA_BY_ID, {
    variables: { pizzaId: parseInt(params.id ?? "-1") },
  });
  const { data, loading, error } = useQuery(GET_TOPPINGS);
  const [updatePizza, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_PIZZA);
  const navigate = useNavigate();

  if (loading || pizzaLoading) {
    return <div>Fetching toppings & pizza details...</div>;
  }

  if (error || pizzaError) {
    return (
      <>
        <div>Opps, dropped the flavours while fetching</div>
        <div>{error && error?.message}</div>
        <div>{pizzaError && pizzaError?.message}</div>
      </>
    );
  }

  if (!data.toppings.length) {
    return <div>Opps!, no toppings found, kindly restock!</div>;
  }

  if (mutationLoading) {
    return <div>Updating pizza recipe...</div>;
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

  const onUpdate = async (pizza: string, toppingID: string, status: string) => {
    await updatePizza({
      variables: {
        id: parseInt(params.id ?? "-1"),
        pizza,
        status,
        toppings: [{ id: parseInt(toppingID ?? "0") }],
      },
    });
    if (!mutationError) {
      refetch();
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
        <h1>Update Pizza</h1>
      </header>
      <PizzaForm
        pizza={pizzaData.pizza.pizza}
        status={pizzaData.pizza.status}
        toppingID={pizzaData.pizza.toppings[0].id}
        toppingsLength={data.toppings.length}
        onSubmit={onUpdate}
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

export default UpdatePizza;
