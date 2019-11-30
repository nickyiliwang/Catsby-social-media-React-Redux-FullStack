import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Components
import CustomButton from "../../util/CustomButton";
import PostOnePost from "../post/PostOnePost";
import Notifications from "./Notifications";
// import SearchBar from './SearchBar/SearchBar'
// Redux
import { connect } from "react-redux";
// MUI
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Button from "@material-ui/core/Button";
// Icons
import HomeIcon from "@material-ui/icons/Home";

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;

    return (
      <AppBar>
        <ToolBar className="nav-container">
          {authenticated ? (
            <Fragment>
            {/* <SearchBar /> */}
              <PostOnePost />
              <Link to="/">
                <CustomButton tip="Home">
                  <HomeIcon />
                </CustomButton>
              </Link>
              <Notifications />
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </ToolBar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
