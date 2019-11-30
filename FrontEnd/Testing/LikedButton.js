import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { likePost, unlikePost } from "../../Redux/actions/dataActions";
// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// Util
import CustomButton from "../../util/CustomButton";

export class LikeButton extends Component {
  state = {
    validAction: true,
    like: null
  };

  likedPost = () => {
    const { user, postId } = this.props;
    if (user.likes && user.likes.find(like => like.postId === postId))
      return true;
    else return false;
  };

  unlikePost = () => {
    this.setState({ like: false });
    // determine if the user is spam clicking
    this.state.validAction
      ? this.setState({ validAction: false })
      : this.setState({ validAction: true });
    // input delay before sending the request
    const timeOut = setTimeout(() => {
      console.log("Action");
      this.setState({ validAction: false });
    }, 5000);
    // const timeOut = setTimeout(() => {
    //   this.likedPost()
    //     ? unlikePost(this.props.postId)
    //     : this.props.likePost(this.props.postId);
    // }, 5000);

    if (this.state.validAction === false) {
      clearInterval(timeOut);
      console.log("do nothing");
    }
  };
  likePost = () => {
    this.setState({ like: true });
    // determine if the user is spam clicking
    this.state.validAction
      ? this.setState({ validAction: false })
      : this.setState({ validAction: true });
    // input delay before sending the request
    const timeOut = setTimeout(() => {
      console.log("Action");
      this.setState({ validAction: false });
    }, 5000);
    // const timeOut = setTimeout(() => {
    //   this.likedPost()
    //     ? unlikePost(this.props.postId)
    //     : this.props.likePost(this.props.postId);
    // }, 5000);

    if (this.state.validAction === false) {
      clearInterval(timeOut);
      console.log("do nothing");
    }
  };

  handleOnClick = action => {
    clearInterval(this.state.intervalId);

    this.state.validAction
      ? this.setState({ validAction: false })
      : this.setState({ validAction: true });

    const timeOut = setTimeout(() => {
      action === "like"
        ? this.props.likePost(this.props.postId)
        : this.likedPost()
        ? this.props.unlikePost(this.props.postId)
        : console.log("already unliked");
      this.setState({ validAction: false });
    }, 2000);

    this.setState({ intervalId: timeOut });
    if (this.state.validAction === false) {
      clearInterval(this.state.intervalId);
    }
  };

  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <CustomButton tip="Like">
          <FavoriteBorder color="primary" />
        </CustomButton>
      </Link>
    ) : this.likedPost() || this.state.like ? (
      <CustomButton tip="Unlike" onClick={this.unlikePost}>
        <FavoriteIcon color="primary" />
      </CustomButton>
    ) : (
      <CustomButton tip="Like" onClick={this.likePost}>
        <FavoriteBorder color="primary" />
      </CustomButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  postId: PropTypes.string,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { likePost, unlikePost }
)(LikeButton);
