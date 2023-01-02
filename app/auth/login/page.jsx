"use client";
import Link from "next/link";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { getError } from "../../../utils/error";

export default function LoginScreen() {
  const { data: session } = useSession();

  if (session) {
    redirect("/admin");
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
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
      <h1 className="mb-4 text-3xl text-blue-800">Sign In</h1>
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
      <div>
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
        <button className="primary-button mt-4">Sign In</button>
      </div>
      <div className="text-md text-red-400">
        Don&apos;t have an account? &nbsp;
      </div>
      <Link href="/" className="text-sm text-blue-400">
        <h4>Register</h4>
      </Link>
    </form>
  );
}
