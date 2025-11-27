import { Redirect } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = ({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: string;
}) => {
  const { isLoggedIn, isAdmin, user } = useAuthStore();

  // No logueado
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  if (!user?.verified) {
    return <Redirect to="/not-verified" />;
  }

  if (!user?.status) {
    return <Redirect to="/not-activate" />;
  }

  if (requiredRole === "ADMIN" && !isAdmin) {
    return <Redirect to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
