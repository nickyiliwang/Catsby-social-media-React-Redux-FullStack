import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { editUserDetails } from "../../Redux/actions/userActions";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import CustomButton from "../../util/CustomButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// Icons
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
  ...theme.editDetailsComponent
});

class EditDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };

  handleClose = () => this.setState({ open: false });

  handleTextFieldChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  handleSubmit = () => {
    const { bio, website, location } = this.state;

    const userDetails = {
      bio,
      website,
      location
    };

    this.props.editUserDetails(userDetails);
    this.handleClose();
  };

  mapUserDetailsToState = credentials =>
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : ""
    });

  componentDidMount() {
    this.mapUserDetailsToState(this.props.credentials);
  }

  render() {
    const { classes } = this.props;
    const { bio, website, location } = this.state;

    return (
      <Fragment>
        <CustomButton
          tip="Edit details"
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditIcon color="primary" />
        </CustomButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>

          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={bio}
                onChange={this.handleTextFieldChange}
                fullWidth
              />
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="Your personal/professional website"
                className={classes.textField}
                value={website}
                onChange={this.handleTextFieldChange}
                fullWidth
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                placeholder="Where you live"
                className={classes.textField}
                value={location}
                onChange={this.handleTextFieldChange}
                fullWidth
              />
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleSubmit} color="primary">
                  Save
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  credentials: state.user.credentials
});

export default connect(
  mapStateToProps,
  { editUserDetails }
)(withStyles(styles)(EditDetails));
