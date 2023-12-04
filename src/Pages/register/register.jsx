import React, { useState } from "react";
import "./register.css";
import { Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const RegisterUser = () => {
  const [name, setName] = useState("");
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
    console.log(userList);
    if (!userList) {
      const updatedUserList = [];
      updatedUserList.push({
        name: name,
        email: email,
        password: password,
      });
      localStorage.setItem("user-list", JSON.stringify(updatedUserList));
    } else if (userList.length > 0) {
      const userIndex = userList.findIndex((user) => user.email === email);
      if (userIndex >= 0) {
        /* user all ready present */
        setMessage(
          "This email address is already in use, Please try with different email"
        );
        setName("");
        setEmail("");
        setPassword("");
        handleClick();
      } else {
        const updatedUserList = [...userList];
        updatedUserList.push({
          name: name,
          email: email,
          password: password,
        });
        localStorage.setItem("user-list", JSON.stringify(updatedUserList));
        setMessage("User created successfully!");
        handleClick();
        navigate("/login");
      }
    }
  };

  return (
    <div className="p-5">
      <div className="card p-4">
        <div className="register-title">Create Account </div>
        <form>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Full Name"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </div>
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
