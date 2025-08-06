import { images } from "@/app/constants";
import Image from "next/image";

export default function OneIdBox() {
  return (
    <div className="inline-block rounded-md max-w-[190px] w-full">
      <p className="mb-2 text-xl text-dark">с помощью One ID:</p>
      <a href="/api/auth/oneid/login" className="flex items-center w-full gap-3 px-4 py-2 font-bold text-white rounded-lg bg-primary">
        <Image src={images.OneId} alt="One ID" width={40} height={40} />
        <span>Перейти</span>
      </a>
    </div>
  );
}
