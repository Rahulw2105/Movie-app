import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Router, useRoutes } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { Search } from "./Pages/search/search";
import { Header } from "./shared/components/header/header";
import { Upcoming } from "./Pages/upcoming/upcoming";
import { Categories } from "./Pages/categories/categories";
import { RegisterUser } from "./Pages/register/register";
import { Login } from "./Pages/Login/Login";
import { useEffect } from "react";

function App() {
  const routes = useRoutes([
    {
      path: "",
      Component: Home,
    },
    {
      path: "search",
      Component: Search,
    },
    {
      path: "upcoming",
      Component: Upcoming,
    },
    {
      path: "categories/:id",
      Component: Categories,
    },
    {
      path: "register",
      Component: RegisterUser,
    },
    {
      path: "login",
      Component: Login,
    },
  ]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log(loggedInUser);
    if (loggedInUser) {
    }
  }, []);

  return (
    <div>
      <div>
        <Header />
      </div>
      {routes}
    </div>
  );
}

export default App;
