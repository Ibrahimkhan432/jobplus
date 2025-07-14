"use client";

import { useState, } from "react";
import { User, LogOut, Menu, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setUser } from "../../../redux/authSlice"
import axiosInstance from "@/utils/axios";
export default function Navbar() {
  const { user } = useSelector((store: any) => store.auth);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {

    try {
      const res = await axiosInstance.get(`/user/Logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav
      className="sticky  z-50 transition-all bgMain-gradient mb-4 duration-300 bg-transparent"
    >
      <div className="flex h-16 items-center lg:px-30 md:px-20 container mx-auto">
        <div className="flex items-center mr-6">
          <Link to="/" className="flex items-center gap-2">
            <div
              className={`bgMain-gradient p-2 rounded-lg shadow-md`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <div className="flex flex-col ">
              <span
                className={`text-xl font-extrabold w-[90px] text-white`}
              >
                Job Plus
              </span>
              <span
                className={`text-xs font-medium -mt-1 text-white`}
              >
                Find Your Dream Career
              </span>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-1 mx-auto text-md">

          {user?.role === "recruiter" ? (
            <>
              <Link
                to="/recruiter/dashboard"
                className="px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/20 hover:text-white text-white"
              >
                Companies
              </Link>
              <Link
                to="/admin/jobs"
                className="px-4 py-2 rounded-md text-md font-medium transition-colors hover:bg-white/20 hover:text-white text-white"
              >
                Jobs
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="px-4 py-2 rounded-md text-md font-medium transition-colors hover:bg-white/20 hover:text-white text-white"
              >
                Home
              </Link>
              <Link
                to="/jobs"
                className="px-4 py-2 rounded-md text-md font-medium transition-colors hover:bg-white/20 hover:text-white text-white"
              >
                Jobs
              </Link>
              <Link
                to="/browser"
                className="px-4 py-2 rounded-md text-md font-medium transition-colors hover:bg-white/20 hover:text-white text-white"
              >
                Browser
              </Link>
            </>
          )}
        </div>

        <div className="flex-1 md:flex-none md:w-auto flex justify-end md:justify-start ml-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
          </Button>
        </div>

        <div className="flex items-center ml-auto gap-2 md:flex">
          {user ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full p-0 overflow-hidden border-2 border-white/30 hover:border-white/60"
                  >
                    <Avatar className="h-full w-full cursor-pointer">
                      <AvatarImage
                        src={user.profile || "/placeholder.svg"}
                        alt={user.fullName}
                      />
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {user.fullName?.[0] ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-64 p-0 overflow-hidden border-2 border-blue-100"
                  align="end"
                >
                  <div className="bgMain-gradient p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-white">
                        <AvatarImage
                          src={user.profile || "/placeholder.svg"}
                          alt={user.fullName}
                        />
                        <AvatarFallback className="bg-white text-blue-700">
                          {user.fullName?.[0] ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">
                          {user.fullName.toUpperCase()}
                        </span>
                        <span className="text-xs text-blue-100">
                          {
                            user?.profile?.bio
                          }                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-white">
                    <div className="flex flex-col gap-2">
                      <Link to="/profile">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start w-full hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Button>
                      </Link>
                      <Button
                        onClick={handleLogout}
                        variant="ghost"
                        size="sm"
                        className="justify-start w-full hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                      >
                        <LogOut
                          className="mr-2 h-4 w-4"
                        />
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="border-2 cursor-pointer text-white md:flex hidden"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="ghost"
                  className="border-none text-blue-600 cursor-pointer bg-white md:flex hidden"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden ml-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-base text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open menu</span>
            <Menu className="h-10 w-10" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="md:hidden px-4 pb-4 pt-2 border-t bg-white/10 backdrop-blur-md"
        >
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/20 text-white"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            {user?.role === "recruiter" ? (
              <>
                <Link
                  to="recruiter/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/20 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Companies
                </Link>
                <Link
                  to="/admin/jobs"
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/20 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Jobs
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/jobs"
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/20 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Jobs
                </Link>
                <Link
                  to="/browser"
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/20 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Browser
                </Link>
              </>
            )}
            {!user && (
              <div
                className="pt-2 mt-2 border-t border-white/10 flex flex-col space-y-2"
              >
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}