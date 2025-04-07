"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./ui/theme-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { LoginModal } from "./LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../redux/authSlice";
import { TokenExpiredModal } from "./TokenExpiredModal";
import { useLoginModalStore } from "@/app/authStore";
import { SidebarMenuButton, SidebarTrigger } from "./ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const loginModalState = useLoginModalStore((state) => state.loginModalState);
  const [loginOpen, setLoginOpen] = useState(loginModalState);
  const setLoginModalState = useLoginModalStore(
    (state) => state.setLoginModalState
  );

  useEffect(() => {
    setLoginOpen(loginModalState);
  }, [loginModalState]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
   
    <Fragment>
      <header className="py-3 sticky top-0 flex items-center justify-between gap-6 bg-white dark:bg-black  h-16 shrink-0 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
    <div className="flex items-center gap-2 px-4">
     
      <Separator orientation="vertical" className="mr-2 h-4" />
  {/*     <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#">
              Building Your Application
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}
    </div>
        <div className="flex items-center gap-3 px-3">
          <ThemeToggle />
          <div className="flex mr-2 items-center gap-2">
             <DropdownMenu>
             <DropdownMenuTrigger asChild className="cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="end"
                        sideOffset={4}>
                        <DropdownMenuLabel className="p-0 font-normal">
                          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-8 w-8 rounded-lg">
                              <AvatarImage  />
                              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                              <span className="truncate font-semibold">Name</span>
                              <span className="truncate text-xs">Surname</span>
                            </div>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Sparkles />
                            Upgrade to Pro
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <BadgeCheck />
                            Account
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CreditCard />
                            Billing
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Bell />
                            Notifications
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <LogOut />
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
            </div>
        </div>
      </header>
      <TokenExpiredModal />
      <LoginModal
        loginOpen={loginOpen}
        setLoginOpen={setLoginOpen}
        user={user}
      />
    </Fragment>
  );
};

export default Navbar;
