"use client";
import Link from "next/link";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { getError } from "../../../utils/error";
import axios from "axios";

export default function RegisterScreen() {
  const { data: session } = useSession();

  if (session) {
    redirect("/admin");
  }

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <form
      className="mx-auto mt-16 max-w-screen-md"
      onSubmit={handleSubmit(submitHandler)}
    >
      <h1 className="mb-4 text-3xl text-blue-800">Sign Up</h1>
      <div className="mb-4">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="w-full rounded border  p-2 outline-none  ring-indigo-300 focus:ring"
          id="name"
          autoFocus
          {...register("name", {
            required: "Please enter name",
          })}
        />
        {errors.name && (
          <div className="text-red-500">{errors.name.message}</div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Please enter email",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Invalid email address",
            },
          })}
          className="w-full rounded border p-2  outline-none ring-indigo-300  focus:ring"
          id="email"
          autoFocus
        ></input>
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
        <small id="emailHelp" className="text-sm text-gray-400 ">
          We&apos;ll never share your email with anyone else
        </small>
      </div>
      <div className="mb-4">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Please enter password",
            minLength: {
              value: 6,
              message: "password is more than 5 characters",
            },
          })}
          className="w-full rounded border p-2  outline-none ring-indigo-300  focus:ring"
          id="password"
          autoFocus
        ></input>
        {errors.password && (
          <div className="text-red-500 ">{errors.password.message}</div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          className=" w-full rounded  border p-2  outline-none ring-indigo-300 focus:ring"
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "Please enter confirm password",
            validate: (value) => value === getValues("password"),
            minLength: {
              value: 6,
              message: "confirm password is more than 5 chars",
            },
          })}
        />
        {errors.confirmPassword && (
          <div className="text-red-500 ">{errors.confirmPassword.message}</div>
        )}
        {errors.confirmPassword &&
          errors.confirmPassword.type === "validate" && (
            <div className="text-red-500 ">Password do not match</div>
          )}
      </div>
      <div className="mb-4">
        <button className="primary-button mt-4">Register</button>
      </div>
      <div className="text-md text-red-400">
        Already have an account? &nbsp;
      </div>
      <Link href="/auth/login" className="text-sm text-blue-400">
        <h4>Sign in</h4>
      </Link>
    </form>
  );
}
