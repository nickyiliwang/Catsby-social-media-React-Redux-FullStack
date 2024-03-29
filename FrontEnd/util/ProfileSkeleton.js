import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import NoImg from "../util/images/no-img.png";
// MUI
import Paper from "@material-ui/core/Paper";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = theme => ({
  ...theme.ProfileSkeleton
});

const ProfileSkeleton = props => {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={NoImg} alt="profile" className="profile-image" />
            <hr />
            <div className="profile-details">
              <div className={classes.handle} />
              <hr />
              <div className={classes.fullLine} />
              <div className={classes.fullLine} />
              <hr />
              <LocationOn color="primary" />
              <span>Location</span>
              <LinkIcon color="primary" />
              https://website.com
              <hr />
              <CalendarToday color="primary" />
              Joined date
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);
