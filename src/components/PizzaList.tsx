import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { GET_PIZZAS } from "../graphql/pizzas/queries";
import { IPizza } from "../graphql/pizzas/types";

const PizzaList = () => {
  const { loading, data, error } = useQuery(GET_PIZZAS, {
    errorPolicy: "all",
    // fetchPolicy: "network-only",
  });

  if (loading) {
    return <div>Fetching data...</div>;
  }

  return (
    <>
      <h1>All Pizzas</h1>
      <Link to='add' style={{ backgroundColor: "#646cff", color: "#fefefe" }}>
        Add Pizza
      </Link>
      {error && (
        <>
          <div>Some Error Occurred!</div>
          <div>{error?.message}</div>
        </>
      )}
      {data && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            backgroundColor: "#292929",
            borderRadius: "1rem",
            padding: "2rem 1rem",
            margin: "4rem",
          }}
        >
          {data.pizzas.map((pizza: IPizza) => (
            <Link key={`${pizza.id}-pizza`} to={`${pizza.id}`}>
              {pizza.pizza}
            </Link>
          ))}
        </div>
      )}
      <Link to='/' style={{ color: "#fefefe" }}>
        Home
      </Link>
    </>
  );
};

export default PizzaList;
