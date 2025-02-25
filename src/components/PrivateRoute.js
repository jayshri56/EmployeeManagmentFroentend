import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const userRole = useSelector((state) => state.employee.role);

  return (
    <Route
      {...rest}
      render={(props) =>
        allowedRoles.includes(userRole) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
