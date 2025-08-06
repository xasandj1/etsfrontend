"use client";
import React from "react";
import Image from "next/image";
import { images } from "@/app/constants";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  const hideHeaderRoutes = ["/", "/signup", "/register"]; // keraklisini qo‘shib ket

  if (hideHeaderRoutes.includes(pathname)) return null;

  return (
    <header className="pt-[45px] pb-[33px]">
      <div className="container">
        <div className="flex justify-between items-center">
          <a href="">
            <Image src={images.Logo} alt="Logo" />
          </a>
          <div className="flex items-center gap-5">
            <button className="flex items-center bg-primary px-4 py-2 gap-2 text-white cursor-pointer rounded-[7px]">
              <Image src={images.AddNotes} alt="AddNotes" />
              <span className="font-bold text-white">Подать заявку</span>
            </button>
            <button className="bg-secondary px-4 py-2 text-white cursor-pointer rounded-[7px]">
              Выйти
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
