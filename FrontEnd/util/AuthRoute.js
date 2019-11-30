import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropsTypes from "prop-types";

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  // If the user is authenticated, We redirect all button clicks of home, login, and signup back to home/ to = '/'

  <Route
    {...rest}
    render={props =>
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

AuthRoute.propTypes = {
  user: PropsTypes.object
};

export default connect(mapStateToProps)(AuthRoute);

// TODO What does this component do, it uses redux state as props,
