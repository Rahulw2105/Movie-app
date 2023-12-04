import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategroiesList } from "../../utils/axios";

export const Header = () => {
  const navigate = useNavigate();
  const [categoriesList, setCategoriesList] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();

  /* useEffects */
  useEffect(() => {
    fetchCategroiesList().then((res) => {
      setCategoriesList(res.data.genres);
    });
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log(loggedInUser);
    if (loggedInUser) {
      setLoggedIn(true);
      setLoggedInUser(loggedInUser);
    }
  }, []);

  const navigateUser = (link) => {
    navigate(link);
  };

  const logoutUser = () => {
    localStorage.setItem("loggedInUser", JSON.stringify(null));
    navigate("login");
    window.location.reload();
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand">Movies</span>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {loggedIn && (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <span
                      className="nav-link active"
                      aria-current="page"
                      role="button"
                      onClick={() => {
                        navigateUser("");
                      }}
                    >
                      Popular Movies
                    </span>
                  </li>
                  <li className="nav-item">
                    <span
                      className="nav-link active"
                      aria-current="page"
                      role="button"
                      onClick={() => {
                        navigateUser("upcoming");
                      }}
                    >
                      Upcoming Movies
                    </span>
                  </li>
                  <li className="nav-item">
                    <span
                      className="nav-link "
                      aria-disabled="true"
                      role="button"
                      onClick={() => {
                        navigateUser("search");
                      }}
                    >
                      Search
                    </span>
                  </li>
                  <li className="nav-item dropdown">
                    <span
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Categroies
                    </span>
                    <ul className="dropdown-menu">
                      {categoriesList &&
                        categoriesList.map((list) => (
                          <li key={list.id}>
                            <span
                              className="dropdown-item"
                              role="button"
                              key={list.id}
                              onClick={() => {
                                navigateUser(`categories/${list.id}`);
                              }}
                            >
                              {list.name}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </li>
                </ul>
                <span className="nav-item">
                  <span
                    className="nav-link"
                    role="button"
                    aria-expanded="false"
                    onClick={() => {
                      logoutUser();
                    }}
                  >
                    Logout
                  </span>
                </span>
              </>
            )}
            {!loggedIn && (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <span
                    className="nav-link active"
                    aria-current="page"
                    role="button"
                    onClick={() => {
                      navigateUser("login");
                    }}
                  >
                    Login
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link active"
                    aria-current="page"
                    role="button"
                    onClick={() => {
                      navigateUser("register");
                    }}
                  >
                    Register
                  </span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
