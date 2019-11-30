import React, { Component } from "react";
import PropTypes from "prop-types";
import AppIcon from "../util/images/cat-icon.png";
import { Link } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { signupUser } from "../Redux/actions/userActions";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  ...theme.pages
});

class signup extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
    errors: {}
  };

  static getDerivedStateFromProps(props) {
    // migrated from componentWillReceiveProps
    // receive new props for submit errors
    if (props.UI.errors) {
      return { errors: props.UI.errors };
    }
    return null;
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });

    const { email, password, confirmPassword, handle } = this.state;

    const newUserData = {
      email,
      password,
      confirmPassword,
      handle
    };
    this.props.signupUser(newUserData, this.props.history);
  };

  handleChange = e => {
    this.setState({
      // dynamically record both email and password
      [e.target.name]: e.target.value
    });
  };

  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="cat-icon" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email} // shows user errors
              error={errors.email ? true : false} // changes textBox color to red
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password} // shows user errors
              error={errors.password ? true : false} // changes textBox color to red
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              helperText={errors.confirmPassword} // shows user errors
              error={errors.confirmPassword ? true : false} // changes textBox color to red
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Handle"
              className={classes.textField}
              helperText={errors.handle} // shows user errors
              error={errors.handle ? true : false} // changes textBox color to red
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Signup
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Already have an account ? login <Link to="/login">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { signupUser }
)(withStyles(styles)(signup));
