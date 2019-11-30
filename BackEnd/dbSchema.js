let db = {
  users: [
    {
      bio: "Hello I am a cute kitten",
      createdAt: "2019-09-04T15:50:15.687Z",
      email: "kitten@gmail.com",
      handle: "kitten",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/social-media-66682.appspot.com/o/632330373.png?alt=media",
      location: "Ontaio, CA",
      userId: "pI5RI57V6zMY5sl8vfiXSeDWunt1",
      website: "https://kitten.com"
    }
  ],

  posts: [
    {
      userHandle: "user",
      body: "this is the post body",
      createdAt: "2019-08-28T11:45:21.608Z",
      likeCount: 5,
      commentCount: 2
    }
  ],
  comments: [
    {
      userHandle: "user",
      postId: "sldkfjslkdfjsldkfjsdf",
      body: "nice kitten!",
      createdAt: "2019-09-05T10:59:52.798Z"
    }
  ],
  notifications: [
    {
      recipient: "user",
      sender: "nick",
      read: "true|false",
      postId: "sdfadfasdfasdfasdfasdfasdf",
      type: "like|comment",
      createdAt: "2019-08-28T11:45:21.608Z"
    }
  ]
};

const userDetails = {
  // Redux State
  credentials: {
    bio: "Hello I am a cute kitten",
    createdAt: "2019-09-04T15:50:15.687Z",
    email: "kitten@gmail.com",
    handle: "kitten",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/social-media-66682.appspot.com/o/632330373.png?alt=media",
    location: "Ontaio, CA",
    userId: "pI5RI57V6zMY5sl8vfiXSeDWunt1",
    website: "https://kitten.com"
  },
  likes: [
    {
      userHandle: "nick",
      postId: "a32dsf1a3dsf21ads3f21"
    },
    {
      userHandle: "emily",
      postId: "as6d5f4a6sdf54qw3e2r1"
    }
  ]
};
