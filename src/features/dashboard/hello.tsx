"use client";
import Cookies from "js-cookie";

export const Hello = () => {
  const name = Cookies.get("user_fname")

  return (
    <h1 className="text-5xl font-bold">Welcome back, {name}</h1>
  )
}