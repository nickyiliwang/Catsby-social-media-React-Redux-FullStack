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
  likedPost = () => {
    const { user, postId } = this.props;
    if (user.likes && user.likes.find(like => like.postId === postId))
      return true;
    else return false;
  };

  handleLikePost = () => {
    this.props.likePost(this.props.postId);
  };

  handleUnlikePost = () => {
    this.props.unlikePost(this.props.postId);
  };

  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <CustomButton tip="Like">
          <FavoriteBorder color="primary" />
        </CustomButton>
      </Link>
    ) : this.likedPost() ? (
      <CustomButton tip="Unlike" onClick={this.handleUnlikePost}>
        <FavoriteIcon color="primary" />
      </CustomButton>
    ) : (
      <CustomButton tip="Like" onClick={this.handleLikePost}>
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
