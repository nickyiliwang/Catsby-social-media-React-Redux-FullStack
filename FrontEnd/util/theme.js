import { fade } from "@material-ui/core/styles";
const primaryMain = "#B2E5FC";

export default {
  palette: {
    primary: {
      light: "#33c9dc",
      main: primaryMain,
      dark: "#008394",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff"
    },
    typography: {
      userNextVariants: true
    }
  },
  //////////////////////////////////////////
  postComponent: {
    card: {
      position: "relative",
      display: "flex",
      marginBottom: 20
    },
    image: {
      minWidth: 200
    },
    content: {
      padding: 25,
      objectFit: "cover",
      overflowWrap: "break-word"
    }
  },
  //////////////////////////////////////////
  deletePostComponent: {
    deleteButton: {
      position: "absolute",
      left: "90%",
      top: "13px"
    }
  },
  //////////////////////////////////////////
  pages: {
    form: {
      textAlign: "center"
    },
    image: {
      margin: "20px auto 20px auto",
      width: "50px",
      height: "auto"
    },
    pageTitle: {
      margin: "auto"
    },
    textField: {
      margin: "10px auto 10px auto"
    },
    button: {
      marginTop: "20px",
      position: "relative"
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: "10px"
    },
    progress: {
      position: "absolute"
    }
  },
  //////////////////////////////////////////
  ProfileComponents: {
    // TODO, floating profile that follows scroll
    paper: {
      padding: 20
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%"
        }
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%"
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle"
        },
        "& a": {
          color: primaryMain
        }
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0"
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer"
        }
      }
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px"
      }
    }
  },
  //////////////////////////////////////////
  StaticProfileComponent: {
    paper: {
      padding: 20
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative"
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%"
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle"
        },
        "& a": {
          color: primaryMain
        }
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0"
      }
    }
  },
  //////////////////////////////////////////
  editDetailsComponent: {
    button: {
      float: "right"
    },
    textField: {
      margin: "10px auto 10px auto"
    }
  },
  //////////////////////////////////////////
  PostPostComponent: {
    submitButton: {
      position: "relative",
      float: "right",
      margin: 10
    },
    progressSpinner: {
      position: "absolute"
    },
    closeButton: {
      position: "absolute",
      left: "91%",
      top: "16%"
    },
    textField: {
      margin: "10px auto 10px auto"
    }
  },
  //////////////////////////////////////////
  PostDialogComponent: {
    profileImage: {
      maxWidth: 200,
      height: 200,
      borderRadius: "50%",
      objectFit: "cover"
    },
    dialogContent: {
      padding: 30,
      overflowWrap: "break-word"
    },
    closeButton: {
      position: "absolute",
      left: "90%",
      top: "3%"
    },
    expandButton: {
      position: "absolute",
      left: "90%"
    },
    spinnerDiv: {
      textAlign: "center",
      marginTop: 50,
      marginBottom: 50
    },
    invisibleSeparator: {
      border: "none",
      margin: "4"
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: 20
    }
  },
  //////////////////////////////////////////
  CommentComponent: {
    commentImage: {
      maxWidth: "100%",
      height: 100,
      objectFit: "cover",
      borderRadius: "50%"
    },
    commentData: {
      marginLeft: 20,
      minWidth: 300
    },
    invisibleSeparator: {
      border: "none",
      margin: "4"
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: 20
    }
  },
  //////////////////////////////////////////
  CommentForm: {
    textField: {
      margin: "10px auto 10px auto"
    }
  },
  //////////////////////////////////////////
  PostSkeleton: {
    card: {
      display: "flex",
      marginBottom: 20
    },
    cardContent: {
      width: "100%",
      flexDirection: "column",
      padding: 25
    },
    cover: {
      minWidth: 200,
      objectFit: "cover"
    },
    handle: {
      width: 60,
      height: 18,
      backgroundColor: primaryMain,
      marginBottom: 7
    },
    date: {
      height: 14,
      width: 100,
      backgroundColor: "rgba(0,0,0,0.2)",
      marginBottom: 10
    },
    fullLine: {
      height: 15,
      width: "90%",
      backgroundColor: "rgba(0,0,0,0.2)",
      marginBottom: 10
    },
    halfLine: {
      height: 15,
      width: "45%",
      backgroundColor: "rgba(0,0,0,0.2)",
      marginBottom: 10
    }
  },
  //////////////////////////////////////////
  ProfileSkeleton: {
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative"
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%"
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle"
        },
        "& a": {
          color: primaryMain
        }
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0"
      }
    },
    handle: {
      width: 60,
      height: 18,
      backgroundColor: primaryMain,
      margin: "0 auto 7px auto "
    },
    fullLine: {
      height: 15,
      width: "100%",
      backgroundColor: "rgba(0,0,0,0.2)",
      marginBottom: 10
    },
    halfLine: {
      height: 15,
      width: "50%",
      backgroundColor: "rgba(0,0,0,0.2)",
      marginBottom: 10
    },
    card: {
      display: "flex",
      marginBottom: 20
    },
    cardContent: {
      width: "100%",
      flexDirection: "column",
      padding: 25
    },
    cover: {
      minWidth: 200,
      objectFit: "cover"
    },

    date: {
      height: 14,
      width: 100,
      backgroundColor: "rgba(0,0,0,0.2)",
      marginBottom: 10
    }
  },
  //////////////////////////////////////////
  SearchBarComponent: {
    search: {
      backgroundColor: fade(primaryMain, 0.15),
      "& :hover": {
        backgroundColor: fade(primaryMain, 0.25)
      },
      marginLeft: 0,
      width: "100%"
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: 'spacing(1, 1, 1, 0)'
    }
  }
};
