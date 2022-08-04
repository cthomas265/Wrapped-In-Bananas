import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_MESSAGE } from "../utils/mutations";
import { Button, Card } from "@mantine/core";

const Message = ({ messages }) => {
  // const updateMessage = useMutation(UPDATE_MESSAGE);
  const [deleteMessage, { error }] = useMutation(DELETE_MESSAGE);

  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const change = setTimeout(() => {
      setAlert(false);
    }, 800);
    return () => clearTimeout(change);
  }, [alert]);

  // const handleUpdateMessage = async ()

  const handleDeleteMessage = async (id) => {
    try {
      // console.log(id);
      await deleteMessage({
        variables: { _id: id },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!messages.length) {
    return <h3>No Messages Yet!</h3>;
  }

  return (
    <div>
      {alert ? <i className="alert">Your message has been deleted</i> : ""}
      {messages &&
        messages.map((message) => (
          <Card
            key={message._id}
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            className="messageCard"
          >
            <p>
              Posted by <b>{message.username}</b> on {message.createdAt}
            </p>
            <Card shadow="sm" className="messageText">
              <p>{message.messageBody}</p>
            </Card>
            <div>
              {/* <button onClick={() => handleUpdateMessage(message._id)}>Edit</button> */}
              <Button
                type="submit"
                color="gray"
                onClick={() => {
                  handleDeleteMessage(message._id);
                  setAlert(true);
                  window.location.reload();
                }}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default Message;
