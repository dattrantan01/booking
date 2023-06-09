import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import http from "../../config/axiosConfig";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const schema = yup
    .object({
      email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email address"),
      password: yup
        .string()
        .min(4, "Your password must be at least 8 characters or greater")
        .required("Please enter your password"),
    })
    .required();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (value) => {
    http
      .post("auth/login", value)
      .then((res) => {
        localStorage.setItem("token", res?.data?.token);
        setUser(res?.data?.customerResponseDto);
        navigate(-1);
      })
      .catch((err) => {
        console.log("error: ", err);
        toast.error("Email or password incorrect");
      });
  };

  return (
    <div className="minH-[100vh] h-[100vh] w-full flex justify-center items-center bg-grayLight">
      <div className="w-[70%] h-[90%] shadow-2xl flex flex-row bg-white">
        <div className="w-[50%] h-[100%] ">
          <img
            src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-[50%] h-[100%] flex flex-col px-8 justify-center">
          <h1 className="font-bungee text-5xl text-center mb-7 text-green-700">
            AirDnD
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Field>
              <Label name="username">Email</Label>
              <Input
                type="text"
                name="email"
                placeholder="Enter your email"
                control={control}
              ></Input>
              {errors.email && (
                <p className="text-sm text-red-500 color-red">
                  {errors.email.message}
                </p>
              )}
            </Field>
            <Field>
              <Label name="password">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                control={control}
              ></Input>
              {errors.password && (
                <p className="text-sm text-red-500 color-red">
                  {errors.password.message}
                </p>
              )}
            </Field>
            <div className="w-full flex justify-center pb-6">
              <Button styleClass="w-[100%]">Sign In</Button>
            </div>
          </form>
          <div className="text-sm flex justify-center text-grayCustom">
            <span className="inline-block mr-1">Don't have an account?</span>
            <NavLink to={"/register"} className="font-semibold cursor-pointer">
              Sign up
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
