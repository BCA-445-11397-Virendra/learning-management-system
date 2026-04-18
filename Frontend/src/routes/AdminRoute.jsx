import { Navigate, Outlet } from "react-router";
import { useGetUserQuery } from "@/features/api/authApi";
import LoaderHome from "@/loader/LoaderHome";

const AdminRoute = () => {
  const { data, isLoading } = useGetUserQuery();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderHome />
      </div>
    );
  }
  return data.user ? <Outlet /> : <Navigate to="/login" replace />
};

export default AdminRoute;
