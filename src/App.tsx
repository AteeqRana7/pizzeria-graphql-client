import { Routes, Route } from "react-router-dom";

import PizzaList from "./components/PizzaList";
import Pizza from "./components/Pizza";
import AddPizza from "./components/AddPizza";
import UpdatePizza from "./components/UpdatePizza";
import Home from "./components/Home";

import "./App.css";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='pizzas' element={<PizzaList />} />
        <Route path='pizzas/:id' element={<Pizza />} />
        <Route path='pizzas/add' element={<AddPizza />} />
        <Route path='pizzas/update/:id' element={<UpdatePizza />} />
      </Routes>
    </div>
  );
}

export default App;
