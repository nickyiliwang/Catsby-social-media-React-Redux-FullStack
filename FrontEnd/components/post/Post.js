import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import dayjs from "dayjs"; // ISO time to days from createdAt
import relativeTime from "dayjs/plugin/relativeTime";
import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";
import LikeButton from "./LikeButton";
//Redux
import { connect } from "react-redux";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// Icons
import ChatIcon from "@material-ui/icons/Chat";
// util
import CustomButton from "../../util/CustomButton";

const styles = theme => ({
  ...theme.postComponent
});

class Post extends Component {
  render() {
    dayjs.extend(relativeTime);

    const {
      classes,
      post: {
        postId,
        body,
        createdAt,
        userHandle,
        userImage,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeletePost postId={postId} />
      ) : null;

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton postId={postId} />
          <span>{likeCount} Likes</span>
          <CustomButton tip="comments">
            <ChatIcon color="primary" />
          </CustomButton>
          <span>{commentCount} comments</span>
          {deleteButton}
          <PostDialog
            postId={postId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Post));
