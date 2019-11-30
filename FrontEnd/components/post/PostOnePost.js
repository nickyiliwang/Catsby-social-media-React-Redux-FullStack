import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// Redux
import { connect } from "react-redux";
import { postOnePost, clearErrors } from "../../Redux/actions/dataActions";
// MUI
import CustomButton from "../../util/CustomButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
// Icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  ...theme.PostPostComponent
});

class PostOnePost extends Component {
  state = {
    open: false,
    body: "",
    errors: {}
  };

  static getDerivedStateFromProps(props) {
    if (props.UI.errors) {
      return { errors: props.UI.errors };
    }
    return null;
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false, errors: {} });
    this.props.clearErrors();
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.postOnePost({ body: this.state.body });
    this.handleClose();
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;

    return (
      <Fragment>
        <CustomButton onClick={this.handleOpen} tip="Create a Post">
          <AddIcon />
        </CustomButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <CustomButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </CustomButton>
          <DialogTitle>Create a Post</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                id="postOnePostTextField"
                name="body"
                type="text"
                label="Body"
                rows="3"
                multiline
                placeholder="Create a Post"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
                autoFocus
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostOnePost.propTypes = {
  postOnePost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { postOnePost, clearErrors }
)(withStyles(styles)(PostOnePost));
