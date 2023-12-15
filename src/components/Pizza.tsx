import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import { GET_PIZZAS, GET_PIZZA_BY_ID } from "../graphql/pizzas/queries";
import { DELETE_PIZZA } from "../graphql/pizzas/mutations";

import PizzaDetails from "./PizzaDetails";

const Pizza = () => {
  const params = useParams();
  const { data, loading, error } = useQuery(GET_PIZZA_BY_ID, {
    variables: { pizzaId: parseInt(params.id ?? "-1") },
    errorPolicy: "all",
  });
  const [deletePizza, { loading: deletionLoading, error: deletionError }] =
    useMutation(DELETE_PIZZA, { refetchQueries: [GET_PIZZAS, "AllPizzas"] });
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <>
        <div>Some Error Occurred!</div>
        <div>{error.message}</div>
      </>
    );
  }

  if (deletionLoading) {
    return <div>Emptying the stock...</div>;
  }

  if (deletionError) {
    return (
      <>
        <div>Opps, unable to remove the pizza!</div>
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

  const onDelete = async () => {
    const deleteRes = await deletePizza({
      variables: { deletePizzaId: parseInt(params.id ?? "-1") },
    });
    if (!deletionError) {
      if (deleteRes.data.deletePizza) {
        navigate("/pizzas");
      }
    }
  };

  return (
    <div>
      <h1>Pizza Details</h1>
      <PizzaDetails
        pizza={data.pizza.pizza}
        status={data.pizza.status}
        toppings={data.pizza.toppings}
      />
      <div style={{ margin: "1rem" }}>
        <Link
          to={`/pizzas/update/${data.pizza.id}`}
          style={{ backgroundColor: "#646cff", color: "#fefefe" }}
        >
          Update
        </Link>
        <button onClick={onDelete} style={{ backgroundColor: "#ff0000" }}>
          Delete
        </button>
      </div>
      <Link to='/pizzas' style={{ color: "#fefefe" }}>
        Back
      </Link>
    </div>
  );
};

export default Pizza;
