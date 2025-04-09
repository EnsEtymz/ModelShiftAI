"use client"
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import { ThemeProvider } from "next-themes";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const excludeSidebarPaths = ["/register", "/login"];
  const showSidebar = !excludeSidebarPaths.includes(pathname);

  return (
    <html lang="en">
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" sizes="32" />
      {/* Sayfa Başlığı */}
      <title>Model Shift</title>
      <meta
        name="description"
        content="This is an awesome app built with Next.js!"
      />
      <body className="bg-white md:bg-[#F0F2F5] dark:bg-gray-950 dark:text-white">
        <Providers>
          <ThemeProvider attribute="class">
            <div className="flex flex-col min-h-screen justify-between">
              {/* <Navbar /> */}
              <Suspense fallback={<Loader />}>
                {showSidebar ? (
                  <SidebarProvider defaultOpen={false}>
                    <AppSidebar />
                    <SidebarInset>
                      <Navbar />
                      <main>{children}</main>
                    </SidebarInset>
                  </SidebarProvider>
                ) : (
                  <>
                    <main>{children}</main>
                  </>
                )}
              </Suspense>
              {/* <Footer /> */}
            </div>
          </ThemeProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}