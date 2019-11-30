const functions = require("firebase-functions");
const cors = require("cors");
const app = require("express")();

app.use(cors());

const { db } = require("./util/admin");

// Post route
const {
  getAllPosts,
  postOnePost,
  getOnePost,
  commentOnPost,
  likePost,
  unlikePost,
  deletePost
} = require("./handlers/posts");

// User route fn
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getAllCurrentUsers,
  getUserDetails,
  markNotificationsRead
} = require("./handlers/users");
// Auth middleware
const FBAuth = require("./util/fbAuthMiddleware");

// Post Routes
app.get("/posts", getAllPosts);
app.get("/post/:postId", getOnePost);
app.post("/post", FBAuth, postOnePost);
app.options("/post/:postId", cors());
app.delete("/post/:postId", cors(), FBAuth, deletePost);

// Post Actions Routes
app.get("/post/:postId/like", FBAuth, likePost);
app.get("/post/:postId/unlike", FBAuth, unlikePost);
app.post("/post/:postId/comment", FBAuth, commentOnPost);

// User Routes
app.get("/user", FBAuth, getAuthenticatedUser);
app.get('/users', getAllCurrentUsers)
app.get("/user/:handle", getUserDetails);
app.post("/notifications", FBAuth, markNotificationsRead);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);

// Auth Routes
app.post("/signup", signup);
app.post("/login", login);

// adding prefix: https://baseurl.com/api
exports.api = functions.https.onRequest(app);

exports.createNotificationOnLike = functions
  .region("us-central1")
  .firestore.document("/likes/{id}")
  .onCreate(snapshot => {
    return db
      .doc(`/posts/${snapshot.data().postId}`)
      .get()
      .then(doc => {
        // prevent getting a notification from your own likes
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "like",
            read: false,
            postId: doc.id
          });
        }
      })
      .catch(err => console.error(err));
  });

exports.deleteNotificationOnUnlike = functions
  .region("us-central1")
  .firestore.document("/likes/{id}")
  .onDelete(snapshot => {
    return db
      .doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch(err => {
        console.error(err);
        return;
      });
  });

exports.createNotificationOnComment = functions
  .region("us-central1")
  .firestore.document("/comments/{id}")
  .onCreate(snapshot => {
    return db
      .doc(`/posts/${snapshot.data().postId}`)
      .get()
      .then(doc => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "comment",
            read: false,
            postId: doc.id
          });
        }
      })
      .catch(err => {
        console.error(err);
        return;
      });
  });

exports.onUserImageChange = functions
  .region("us-central1")
  .firestore.document("/users/{userId}")
  .onUpdate(change => {
    if (change.before.data().imageUrl !== change.after.data().imageUrl) {
      console.log("image has changed");
      let batch = db.batch();
      return db
        .collection("posts")
        .where("userHandle", "==", change.before.data().handle)
        .get()
        .then(data => {
          data.forEach(doc => {
            const post = db.doc(`/posts/${doc.id}`);
            batch.update(post, { userImage: change.after.data().imageUrl });
          });
          return batch.commit();
        });
    } else return true;
  });

exports.onPostDelete = functions
  .region("us-central1")
  .firestore.document("/posts/{postId}")
  .onDelete((snapshot, context) => {
    const postId = context.params.postId;
    const batch = db.batch();
    return db
      .collection("comments")
      .where("postId", "==", postId)
      .get()
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/comments/${doc.id}`));
        });
        return db
          .collection("likes")
          .where("postId", "==", postId)
          .get();
      })
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/likes/${doc.id}`));
        });
        return db
          .collection("notifications")
          .where("postId", "==", postId)
          .get();
      })
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/notifications/${doc.id}`));
        });
        return batch.commit();
      })
      .catch(err => console.log(err));
  });
