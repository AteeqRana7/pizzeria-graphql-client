import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <header>
        <h1>Bitsol Pizzeria</h1>
      </header>
      <Link to='/pizzas'>View all Pizzas</Link>
    </div>
  );
};

export default Home;
