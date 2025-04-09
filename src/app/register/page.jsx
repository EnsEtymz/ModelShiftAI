'use client';

import { RegisterForm } from "@/components/RegisterForm";
import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";


export default function LoginPage() {
  const user = useSelector((state) => state.auth.user);
if(user){
  window.location.href = '/';
}
return (
  <div className="grid h-screen lg:grid-cols-2">
    <div className="flex flex-col gap-4 p-6 md:p-10 bg-white">
      <div className="flex justify-center gap-2 md:justify-start">
      <Link href="/">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">
          <RegisterForm />
        </div>
      </div>
    </div>
    <div className="relative hidden bg-muted lg:block">
      <img
        src="/register-logo.png"
        alt="Image"
        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>
);
}
