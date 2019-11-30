import React, { Component } from "react";

class MessageList extends Component {
  render() {
    return (
      <div className="message-list">
        {this.props.messages.map(message => {
          return (
            <div key={message.id} className="message">
              <div className="message-username">{message.senderId}</div>
              <div className="message-text">
                {message.parts[0].payload.content}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default MessageList;
