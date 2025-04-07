"use client";
import {useState } from "react";
import { CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/authSlice";
import { useRouter } from "next/navigation";
import ProfileTab from "@/components/ProfileTab";
import ChangePasswordTab from "@/components/ChangePasswordTab";
import { TagsListTab } from "@/components/TagsListTab";

const Page = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex flex-col items-center md:justify-center">
      <CardContent className="flex flex-col gap-6 w-full lg:w-3/5 bg-white rounded-md dark:bg-black dark:border-2">
        <div className="relative bg-white flex flex-col items-center justify-center dark:bg-black">
          <Image
            src="/logo.png"
            alt="Image"
            className="py-2"
            width={120}
            height={70}
          />
        </div>
        <div className="md:flex min-h-96">
          <ul className="flex flex-col md:w-1/3 gap-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
            {[
              { id: "profile", label: "Profile" },
              { id: "password", label: "Change Password" },
              { id: "tags", label: "Tags" },
              { id: "logout", label: "Logout" },
            ].map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => {
                    if (tab.id !== "logout") {
                      setActiveTab(tab.id);
                    } else {
                      handleLogout();
                    }
                  }}
                  className={`inline-flex items-center px-4 py-3 rounded-lg w-full transition-colors ${
                    activeTab === tab.id
                      ? "text-white bg-[#34c75a] hover:bg-[#2aa24a] "
                      : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-black dark:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="px-6 bg-white text-medium text-gray-500 dark:text-gray-400 w-full dark:bg-black ">
            {activeTab === "profile" && (
             <ProfileTab />
            )}
            {activeTab === "password" && (
             <ChangePasswordTab />
            )}
             {activeTab === "tags" && (
             <TagsListTab />
            )}
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default Page;
