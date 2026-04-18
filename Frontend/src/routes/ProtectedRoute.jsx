import { Navigate, Outlet } from "react-router";
import { useGetUserQuery } from "@/features/api/authApi";
import LoaderHome from "@/loader/LoaderHome";

const ProtectedRoute = () => {
  const { data, isLoading } = useGetUserQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderHome />
      </div>
    );
  }

  if (!data?.user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
