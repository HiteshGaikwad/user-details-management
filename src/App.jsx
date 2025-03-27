import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import AdminPage from "./components/AdminPage";
import StudentPage from "./components/StudentPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you have the correct Toastify CSS

function App() {
  const appLayout = createBrowserRouter([
    {
      path: "/", // Default path for LoginPage
      element: <LoginPage />,
    },
    {
      path: "/admin", // Admin page route
      element: (
        <PrivateRouteforadmin>
          <AdminPage />
        </PrivateRouteforadmin>
      ),
    },
    {
      path: "/student", // Student page route
      element: (
        <PrivateRouteforstudent>
          <StudentPage />
        </PrivateRouteforstudent>
      ),
    },
  ]);

  // Private route for student page
  function PrivateRouteforstudent({ children }) {
    const userType = sessionStorage.getItem("userType");
    const isUserAuthenticated = userType === "student";

    if (!isUserAuthenticated) {
      return userType === "admin" ? (
        <Navigate to="/admin" />
      ) : (
        <Navigate to="/" />
      ); // Redirect to Admin page if student is not authenticated
    } else {
      return children;
    }
  }

  // Private route for admin page
  function PrivateRouteforadmin({ children }) {
    const userType = sessionStorage.getItem("userType");
    const isUserAuthenticated = userType === "admin";

    if (!isUserAuthenticated) {
      return userType === "student" ? (
        <Navigate to="/student" />
      ) : (
        <Navigate to="/" />
      );
    } else {
      return children;
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000} // Toast will close after 5 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <RouterProvider router={appLayout} />
    </>
  );
}

export default App;
