"use client";

import { Button } from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { useState } from "react";
import OneIdBox from "../OneIdBox/OneIdBox";

export default function OneIdForm() {
  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Yuborilgan:", form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mt-6 w-full max-w-[300px]"
    >
      <OneIdBox/>
      <p className="text-xl font-regular text-dark">или через логин и пароль:</p>
      <Input
        label="Логин:"
        name="login"
        type="text"
        value={form.login}
        onChange={handleChange}
      />
      <Input
        label="Пароль:"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />
      <div className="flex items-start justify-start max-w-[195px] w-full">
        <Button
          type="submit"
          className="w-full font-bold text-white text-[20px] bg-primary rounded-[10px]"
        >
          Войти
        </Button>
      </div>
    </form>
  );
}
