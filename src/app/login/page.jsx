import { LoginForm } from "@/components/LoginForm"
import { GalleryVerticalEnd } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-0">
      <div className="flex w-full max-w-sm flex-col gap-6 ">
      <Link href="/" className="mx-auto flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}
