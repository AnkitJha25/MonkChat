import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if(username === ""){
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    else if(password === ""){
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(validateForm()){
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>MonkChat</h1>
          </div>

          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Login</button>
          <span>
            Don't have an account ? <Link to="/register">Create One</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height : 100vh;
  width : 100vw;
  display : flex;
  flex-direction : column;
  justify-content : center;
  gap : 1rem;
  align-items : center;
  background-color : #FFF2F2;

  .brand {
    display : flex;
    align-items : center;
    gap : 1rem;
    justify-content : center;
    img {
      height : 5rem;
    }
    h1 {
      color : brown;
      text-transform : uppercase;
    }
  }

  form {
    display : flex;
    flex-direction : column;
    gap : 2rem;
    background-color : #FAD4D4;
    border-radius : 2rem;
    box-shadow : 0px 18px 53px 0px rgba(0, 0, 0, 0.3);
    padding : 5rem;
  }

  input {
    background-color : transparent;
    padding : 1rem;
    border : 0.1rem solid #F47C7C;
    border-radius : 0.4rem;
    color : brown;
    width : 100%;
    font-size : 1rem;
    &:hover {
      border : 0.1rem solid brown;
      outline : none;
    }
  }

  button {
    background-color : brown;
    color : white;
    padding : 1rem 2rem;
    border : none;
    font-weight : bold;
    cursor : pointer;
    border-radius : 0.4rem;
    font-size : 1rem;
    text-transform : uppercase;
    &:hover {
      background-color : red;
    }
  }

  span {
    color : white;
    text-transform : uppercase;
    a {
      color : red;
      text-decoration : none;
      font-weight : bold;
    }
  }
`;