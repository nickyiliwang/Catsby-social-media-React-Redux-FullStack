## Catsby FullStack Social Media

This is the Full Code containing the frontend and backend for a social media clone app called Catsby, which is an app derived and guided from a course taught by Ahmed Hadjou.

you can view the demo at: https://social-media-66682.firebaseapp.com/login

Features:

1. User can sign-up, and login with their credentials
2. Upon registering and logging in. User can post posts and comment on other user's posts, like and get notifications from other user's likes and comments
3. User can edit their profile and upload their profile picture, change their profile detail, and they have their personal home page containing posts their published.
4. Users can delete only their posts but anyone can see all posts by all users as guests.

This App is create with React, and is using Redux as a state management tool, the UI styling is done with Material UI. The backend database is using firebase cloud database, and firebase storage to store the images.

Tools Used to create this App:

1. Postman
2. Chrome Explorer
3. VsCode
4. Darkness
5. Hair pulling
6. Cat videos

Dependencies:
FrontEnd
"@material-ui/core": "^4.4.1",
"@material-ui/icons": "^4.4.1",
"axios": "^0.19.0",
"dayjs": "^1.8.16",
"jwt-decode": "^2.2.0",
"react": "^16.9.0",
"react-dom": "^16.9.0",
"react-redux": "^7.1.1",
"react-router-dom": "^5.0.1",
"redux": "^4.0.4",
"redux-thunk": "^2.3.0"

BackEnd
"busboy": "^0.3.1",
"cors": "^2.8.5",
"firebase": "^6.5.0",
"firebase-admin": "8.0.0",
"firebase-functions": "^3.2.0"
