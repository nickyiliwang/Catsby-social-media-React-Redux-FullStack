import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
//Redux
import { connect } from "react-redux";
import { deletePost } from "../../Redux/actions/dataActions";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
// util
import CustomButton from "../../util/CustomButton";

const styles = theme => ({
  ...theme.deletePostComponent
});

class DeletePost extends Component {
  state = {
    open: false
  };

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });
  deletePost = () => {
    this.props.deletePost(this.props.postId);
    this.setState({ open: false });
  };

  render() {
    const { classes, userHandle } = this.props;
    return (
      <Fragment>
        <CustomButton
          tip="Delete"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </CustomButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            {`Hello ${userHandle}, this post will be deleted and is irreversible!`}
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deletePost} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeletePost.propTypes = {
  deletePost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string
};

const mapStateToProps = state => ({
  userHandle: state.user.credentials.handle
});

export default connect(
  mapStateToProps,
  { deletePost }
)(withStyles(styles)(DeletePost));
