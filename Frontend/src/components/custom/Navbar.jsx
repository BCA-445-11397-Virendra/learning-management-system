import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  DoorOpenIcon,
  LogOutIcon,
  Sheet,
  UserIcon,
} from "lucide-react";
import SheetDemo from "./SheetDemo";
import { useLogOutUserMutation } from "@/features/api/authApi";
import Loader from "./Loader";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  // const { data, isLoading,refetch } = useGetUserQuery();
  // const user = data?.user || {};
  const { user } = useSelector((store) => store.auth);
  const [
    logOutUser,
    {
      isLoading: logOutUserIsLoading,
      isSuccess: logOutUserIsSuccess,
      isError: logOutUserIsError,
    },
  ] = useLogOutUserMutation();

  const handleLogout = async () => {
    await logOutUser();
    navigate("/login");
  };
  useEffect(() => {
    if (logOutUserIsSuccess) {
      toast.success(logOutUserIsSuccess.message || "LogOut Successfully");
    }
    if (logOutUserIsError) {
      toast.error(logOutUser?.data?.message || "LogOut Error");
    }
  }, [
    logOutUserIsSuccess,
    logOutUserIsError,
    logOutUserIsLoading,
    navigate,
    logOutUser?.data?.message,
  ]);
  return (
    <header className="border-b w-full sticky top-0 z-50 bg-[#FCFCFC] align-middle items-center justify-center">
      <div className="flex justify-between px-5 md:px-14 py-4 items-center">
        <div>
          <h1 className="md:text-2xl font-bold">
            <span className="text-[#f00]">Code</span>Nonstop
          </h1>
        </div>
        <div className="hidden md:block lg:block">
          <ul className="flex items-center justify-baseline gap-5 text-[#454545] hover:text-[#2a2a2a]">
            <Link to="/" className="font-medium text-green-900">
              Getting
            </Link>
            <Link to="/courses" className="font-medium">
              Courses
            </Link>
            <Link to="/batch" className="font-medium">
              Batch
            </Link>
            <Link to="/domains" className="font-medium">
              Domains
            </Link>
            {/* <Link to="/preparation" className="font-medium">
              Preparation
            </Link> */}
            {/* <Link to="/mentorship" className="font-medium">
              Mentorship
            </Link> */}
          </ul>
        </div>
        <div className="hidden md:block lg:block">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src={user?.profileUrl || ""} alt="shadcn" />
                    <AvatarFallback>LR</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-50" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <UserIcon />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/account")}>
                    <BadgeCheckIcon />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/my-learning")}>
                    <CreditCardIcon />
                    My Learning
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/notivication")}>
                    <BellIcon />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {(user?.role === "admin" || user?.role === "instructor") && (
                  <DropdownMenuItem>
                    <Button
                      onClick={() => navigate("/dashboard")}
                      className="w-full"
                    >
                      Dashboard
                    </Button>
                  </DropdownMenuItem>
                )}


                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                  <LogOutIcon />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex flex-row gap-4">
              <button
                onClick={() => navigate("/referral")}
                className="border p-2 rounded-full"
              >
                <img
                  src="https://static.uacdn.net/production/_next/static/images/giftHomePage.svg?q=75&auto=format%2Ccompress&w=48"
                  alt=""
                />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="border border-[#3C4852] px-6 py-2 rounded bg-white"
              >
                <span className="text-[#3C4852] font-medium">Log in</span>
              </button>
              <button
                onClick={() => navigate("/login")}
                className="border px-3 py-2 rounded bg-[#3C4852] hover:bg-[#262b2fd7]"
              >
                <span className="text-white font-medium">Join for free</span>
              </button>
            </div>
          )}
        </div>
        <div className="md:hidden lg:hidden">
          <SheetDemo user={user} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
