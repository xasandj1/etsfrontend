"use client";

import Image from "next/image";
import { images } from "../constants";
import { useState } from "react";
import RadioGroup from "@/components/ui/RedioGroup";
import OneIdForm from "@/app/auth/OneIdform/OneIdForm";
import { ForeignForm } from "@/app/auth/ForeignForm/ForeignForm";
import { Button } from "@/components/ui/Button";

export default function SignUpPage() {
  const [form, setForm] = useState({
    juridic: "uz",
  });

  const [showForm, setShowForm] = useState(false); 

  function handleJuridicChange(value) {
    setForm((prev) => ({
      ...prev,
      juridic: value,
    }));
    setShowForm(false); 
  }

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="bg-white w-full pt-[73px] pb-[52px]">
        <div className="container">
          <Image src={images.Logo} alt="Logo" />
          <div className="flex items-center gap-10 mt-10">
            <div className="flex flex-col justify-start border-r-[1px] border-primary max-w-[800px] w-full pr-[105px]">
              <h1 className="text-dark text-3xl font-regular max-w-[860px] w-full">
                Добро пожаловать на платформу регистрации и тестирования
                поставщиков <span className="font-bold text-dark">EVOS.</span>
              </h1>
              <p className="text-dark mt-6 font-regular max-w-[590px] w-full">
                Данная система предназначена для упрощения процесса отбора,
                проверки и сотрудничества с нашими партнёрами.
              </p>

              <div className="flex flex-col justify-between mt-16">
                <h4 className="font-bold text-20">
                  Пожалуйста, начните с выбора категории поставщика:
                </h4>
                <RadioGroup
                  name="yuridik"
                  options={[
                    {
                      value: "uz",
                      label: "Юридическое лицо Республики Узбекистан",
                    },
                    {
                      value: "other",
                      label: "Юридическое лицо другой страны",
                    },
                  ]}
                  selected={form.juridic}
                  onChange={handleJuridicChange}
                />
              </div>
              <div className="max-w-[195px] w-full mt-14">
                <Button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="w-full font-bold text-white text-[20px] bg-primary rounded-[10px]"
                >
                  Продолжить
                </Button>
              </div>
            </div>

            <div className="flex flex-col justify-start max-w-[300px] w-full ml-[40px]">
              <h2 className="mb-4 text-2xl font-bold text-dark">ВОЙТИ</h2>

              {showForm && (
                <div className="fade-in">
                  {form.juridic === "uz" ? <OneIdForm /> : <ForeignForm />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
