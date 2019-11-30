import React, { Component } from "react";
import Chatkit from "@pusher/chatkit-client";
import MessageList from "./components/MessageList";
import NewRoomForm from "./components/NewRoomForm";
import RoomList from "./components/RoomList";
import SendingMessageForm from "./components/SendingMessageForm";
import { tokenUrl, instanceLocator } from "../../util/config";

class ChatApp extends Component {
  state = {
    messages: []
  };

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: "nick",
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        currentUser.subscribeToRoomMultipart({
          roomId: currentUser.rooms[0].id,
          hooks: {
            onMessage: message => {
              console.log("Received message:", message);
              this.setState({ messages: [...this.state.messages, message] });
            }
          }
        });
      })
      .catch(error => {
        console.error("error:", error);
      });
  }

  render() {
    return (
      <div>
        <NewRoomForm />
        <RoomList />
        <MessageList messages={this.state.messages} />
        <SendingMessageForm />
      </div>
    );
  }
}

export default ChatApp;
