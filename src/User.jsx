import React, { useEffect, useState } from "react";
import { Card } from "./components/Card";
import './User.css';

const User = ({ sorting }) => {
  const [users, setUser] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://api.quicksell.co/v1/internal/frontend-assignment", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setUser(data.users);

        // Sort the tickets based on the sorting prop
        let sortedTickets = data.tickets;
        if (sorting === "priority") {
          sortedTickets = sortedTickets.sort((a, b) => b.priority - a.priority);
        } else if (sorting === "Title") {
          sortedTickets = sortedTickets.sort((a, b) => a.title.localeCompare(b.title));
        }

        setTickets(sortedTickets);
      })
      .catch((error) => console.log("error", error));
  }, [sorting]);

  return (
    <div className="user-container">
      {users.map((user) => (
        <div id={user.id} className="user-card">
          <h2> {user.name}</h2>
          <ul className="ticket-list">
            {tickets
              .filter((ticket) => ticket.userId === user.id)
              .map((ticket) => (
                <Card id={ticket.id} title={ticket.title} tag={ticket.tag} />
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default User;
