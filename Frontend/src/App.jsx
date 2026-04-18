import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import MyLearning from "./pages/MyLearning";
import Notifications from "./pages/Notifications";
import Account from "./pages/Account";
import Dashboard from "./pages/admin/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import UpdateCourse from "./pages/admin/course/UpdateCourse";
import CreateLecture from "./pages/admin/lectures/CreateLecture";
import UpdateLecture from "./pages/admin/lectures/UpdateLecture";
import CourseDetails from "./pages/student/CourseDetails";
import Domains from "./pages/Domains";
import Batches from "./pages/Batches";
import Courses from "./pages/student/Courses";
import CourseProgress from "./pages/student/CourseProgress";
import PaymentSuccess from "./components/courses/PaymentSuccess";
import SearchPage from "./pages/student/SearchPage";
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoute";
import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";
import NotFound from "./components/NotFound";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <div>
              <Home />
            </div>
          </>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/course/search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit-profile",
        element: <EditProfile />,
      },
      {
        path: "/my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "/notivication",
        element: <Notifications />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/domains",
        element: <Domains />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/batch",
        element: <Batches />,
      },
      {
        path: "/course-details/:courseId",
        element: (
          <ProtectedRoute>
            <CourseDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/course-progress/:courseId",
        element: (
          <ProtectedRoute>
            <PurchaseCourseProtectedRoute>
              <CourseProgress />
            </PurchaseCourseProtectedRoute>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/course",
        element: <CourseTable />,
      },
      {
        path: "/admin/course/create",
        element: <AddCourse />,
      },
      {
        path: "/admin/course/:courseId",
        element: <UpdateCourse />,
      },
      {
        path: "/admin/course/:courseId/lecture",
        element: <CreateLecture />,
      },
      {
        path: "/admin/course/:courseId/lecture/:lectureId",
        element: <UpdateLecture />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
};

export default App;
