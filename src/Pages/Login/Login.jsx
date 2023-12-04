import { Snackbar } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage("");
    setOpen(false);
  };

  const onSubmitButtonClicked = () => {
    const userList = JSON.parse(localStorage.getItem("user-list"));
    if (userList.length > 0) {
      const findIndex = userList.findIndex(
        (user) => user.email === email && user.password === password
      );
      if (findIndex >= 0) {
        setMessage("Logged In Successfully");
        const loggedInUser = userList[findIndex];
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        handleClick();
        navigate("/");
        window.location.reload();
        /* login success */
      } else {
        /* login failed */
        setMessage("Email or password incorrect, please try again");
        setEmail("");
        setPassword("");
        handleClick();
      }
    } else {
      /* login failed */
      setEmail("");
      setPassword("");
      setMessage("Email or password incorrect, please try again");
      handleClick();
    }
  };

  return (
    <div className="p-5">
      <div className="card p-4">
        <div className="register-title">Login </div>
        <form>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={onSubmitButtonClicked}
          >
            Submit
          </button>
        </form>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
};
