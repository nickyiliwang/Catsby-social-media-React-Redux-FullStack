import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode"; // decodes web tokens
import axios from "axios";
import "./App.css";
// MUI
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";
import { SET_AUTHENTICATED } from "./Redux/types";
import { logoutUser, getUserData } from "./Redux/actions/userActions";
// Util
import AuthRoute from "./util/AuthRoute"; // Redirect route, will redirect to home page if authorized
import themeFile from "./util/theme";
// Components
import Navbar from "./components/navbar/Navbar";
// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";

const token = localStorage.FBIdToken;

axios.defaults.baseURL =
  "https://us-central1-social-media-66682.cloudfunctions.net/api";

if (token) {
  const decodedToken = jwtDecode(token);
  // If the token expires before current date redirect the user to login page
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
    // else send the
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={createMuiTheme(themeFile)}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/signup" component={signup} />
                <AuthRoute exact path="/login" component={login} />
                <Route exact path="/users/:handle" component={user} />
                <Route
                  exact
                  path="/users/:handle/post/:postId"
                  component={user}
                />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
