import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  BadgeCheckIcon,
  BathIcon,
  BellIcon,
  CornerDownRightIcon,
  CreditCardIcon,
  HomeIcon,
  LogOutIcon,
  Menu,
  SidebarIcon,
  SlidersHorizontalIcon,
  UserIcon,
} from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";
import { useLogOutUserMutation } from "@/features/api/authApi";

const SheetDemo = ({ user }) => {
  const navigate = useNavigate();
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
  }, [logOutUserIsSuccess, logOutUserIsError, logOutUserIsLoading, navigate]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="rounded shadow">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="md:hidden">
        <SheetHeader className="border bg-[#FCFCFC]">
          <SheetTitle>CodeNonstop</SheetTitle>
          <SheetDescription className="border px-1 py-3 flex items-center gap-5">
            <Link to="/profile">
              <Avatar>
                <AvatarImage
                  src={user?.profileUrl || "https://github.com/shadcn.png"}
                  alt="IM"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
            </Link>
            <span>
              <span>HI'</span>
              {user?.name || "Virendra Kumar"}
            </span>
          </SheetDescription>
        </SheetHeader>
        <header className="flex flex-col items-star px-1">
          <Link to="/" className="border w-full p-4 flex gap-3 bg-[#FCFCFC]">
            <HomeIcon />
            <span className="font-medium">Getting Started</span>
          </Link>
          <Link
            to="/courses"
            className="border w-full p-4 flex gap-3 bg-[#FCFCFC]"
          >
            <SlidersHorizontalIcon />
            <span className="font-medium">Courses</span>
          </Link>
          <Link
            to="/batch"
            className="border w-full p-4 flex gap-3 bg-[#FCFCFC]"
          >
            <BathIcon />
            <span className="font-medium">Batch</span>
          </Link>
          <Link
            to="/profile"
            className="border w-full p-4 flex gap-3 bg-[#FCFCFC]"
          >
            <UserIcon />
            <span className="font-medium">Profile</span>
          </Link>
          <Link
            to="/account"
            className="border w-full p-4 flex gap-3 bg-[#FCFCFC]"
          >
            <BadgeCheckIcon />
            <span className="font-medium">Account</span>
          </Link>
          <Link
            to="/my_learning"
            className="border w-full p-4 flex gap-3 bg-[#FCFCFC]"
          >
            <CreditCardIcon />
            <span className="font-medium">My_Learning</span>
          </Link>
          <Link
            to="/notification"
            className="border w-full p-4 flex gap-3 bg-[#FCFCFC]"
          >
            <BellIcon />
            <span className="font-medium">Notification</span>
          </Link>
          <Link
            onClick={handleLogout}
            className="border w-full p-4 flex gap-3 bg-[#FCFCFC]"
          >
            <LogOutIcon className="text-[#f00] font-bold" />
            <span className="font-medium">LogOut</span>
          </Link>
        </header>
        <SheetFooter>
          {(user?.role === "admin" || user?.role === "instructor") && (
            <Button type="button" onClick={() => navigate("/dashboard")}>
              Dashboard
            </Button>
          )}
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default SheetDemo;
