import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import { ThemeProvider } from "./components/ThemeProvider";

const Login = lazy(() => import("./pages/Login"));
const HeroSection = lazy(() => import("./pages/student/HeroSection"));
const Courses = lazy(() => import("./pages/student/Courses"));
const MyLearning = lazy(() => import("./pages/student/MyLearning"));
const Profile = lazy(() => import("./pages/student/Profile"));
const Sidebar = lazy(() => import("./pages/admin/Sidebar"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const CourseTable = lazy(() => import("./pages/admin/course/CourseTable"));
const AddCourse = lazy(() => import("./pages/admin/course/AddCourse"));
const EditCourse = lazy(() => import("./pages/admin/course/EditCourse"));
const CreateLecture = lazy(() => import("./pages/admin/lecture/CreateLecture"));
const EditLecture = lazy(() => import("./pages/admin/lecture/EditLecture"));
const CourseDetail = lazy(() => import("./pages/student/CourseDetail"));
const CourseProgress = lazy(() => import("./pages/student/CourseProgress"));
const SearchPage = lazy(() => import("./pages/student/SearchPage"));
const PurchaseCourseProtectedRoute = lazy(() =>
  import("./components/PurchasecourseProtectedRoute")
);

const renderWithSuspense = (component) => (
  <Suspense fallback={<h1>Loading...</h1>}>{component}</Suspense>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: renderWithSuspense(
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: renderWithSuspense(
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "my-learning",
        element: renderWithSuspense(
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: renderWithSuspense(
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "course/search",
        element: renderWithSuspense(
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-detail/:courseId",
        element: renderWithSuspense(
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-progress/:courseId",
        element: renderWithSuspense(
          <ProtectedRoute>
            <PurchaseCourseProtectedRoute>
              <CourseProgress />
            </PurchaseCourseProtectedRoute>
          </ProtectedRoute>
        ),
      },

      //admin route start from here
      {
        path: "admin",
        element: renderWithSuspense(
          <AdminRoute>
            <Sidebar />
          </AdminRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: renderWithSuspense(<Dashboard />),
          },
          {
            path: "course",
            element: renderWithSuspense(<CourseTable />),
          },
          {
            path: "course/create",
            element: renderWithSuspense(<AddCourse />),
          },
          {
            path: "course/:courseId",
            element: renderWithSuspense(<EditCourse />),
          },
          {
            path: "course/:courseId/lecture",
            element: renderWithSuspense(<CreateLecture />),
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: renderWithSuspense(<EditLecture />),
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;
