import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return localStorage.getItem("token") ? (
          <Element {...props} />
        ) : (
          <Navigate to={{ pathname: "/login" }} />
        );
      }}
    />
  );
};

export default PrivateRoute;
