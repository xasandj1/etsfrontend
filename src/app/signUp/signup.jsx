"use client";

import Image from "next/image";
import { images } from "../constants";
import { useState } from "react";
import RadioGroup from "@/components/ui/RedioGroup"; // E'tibor bering: agar fayl nomi noto‘g‘ri bo‘lsa (masalan "RedioGroup"), uni ham to‘g‘rilang.

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: "",
    juridic: "uz",
  });

  const handleJuridicChange = (val) => {
    setForm({ ...form, juridic: val });
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="bg-white w-full pt-[73px] pb-[52px]">
        <div className="container">
          <Image src={images.Logo} alt="Logo" />
          <div className="flex items-center">
            <div className="">
              <div className="flex flex-col justify-center mt-8">
                <h1 className="text-dark text-3xl font-regular max-w-[860px] w-full">
                  Добро пожаловать на платформу регистрации и тестирования
                  поставщиков <span className="text-dark font-bold">EVOS.</span>
                </h1>
                <p className="text-dark mt-6 font-regular max-w-[590px] w-full">
                  Данная система предназначена для упрощения процесса отбора,
                  проверки и сотрудничества с нашими партнёрами.
                </p>
              </div>
              <div className="flex flex-col justify-between mt-16">
                <h4 className="font-bold text-20">
                  Пожалуйста, начните с выбора категории поставщика:
                </h4>
                <RadioGroup
                  name="juridic"
                  options={[
                    {
                      value: "uz",
                      label: "Юридическое лицо Республики Узбекистан",
                    },
                    { value: "other", label: "Юридическое лицо другой страны" },
                  ]}
                  selected={form.juridic}
                  onChange={handleJuridicChange}
                />
              </div>
            </div>
            <div className="">Xasan</div>
          </div>
        </div>
      </div>
    </section>
  );
}
