import React, { useState, useEffect } from 'react';
import { Card } from './components/Card';
import './Status.css';

const Status = ({ sorting }) => {
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [backlog, setBacklog] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          method: 'GET',
          redirect: 'follow',
        };

        const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment", requestOptions);
        const data = await response.json();

        // Filter data based on the status
        const todoData = data.tickets.filter((item) => item.status === "Todo");
        const inProgressData = data.tickets.filter((item) => item.status === "In progress");
        const backlogData = data.tickets.filter((item) => item.status === "Backlog");

        // Sort the data if the sorting criteria is provided
        if (sorting === 'priority') {
          todoData.sort((a, b) => b.priority - a.priority);
          inProgressData.sort((a, b) => b.priority - a.priority);
          backlogData.sort((a, b) => b.priority - a.priority);
        } else if (sorting === 'Title') {
          todoData.sort((a, b) => a.title.localeCompare(b.title));
          inProgressData.sort((a, b) => a.title.localeCompare(b.title));
          backlogData.sort((a, b) => a.title.localeCompare(b.title));
        }

        setTodo(todoData);
        setInProgress(inProgressData);
        setBacklog(backlogData);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, [sorting]);
  return (
    <div className="status-container">
      <div className="status-column">
        <h2 className="status-title">"Todo" {todo.length}</h2>
        <ul className="ticket-list">
          {todo.map((item) => (
              <Card id={item.id} title={item.title} tag={item.tag} />
          ))}
        </ul>
      </div>

      <div className="status-column">
        <h2 className="status-title">"In Progress" {inProgress.length}</h2>
        <ul className="ticket-list">
          {inProgress.map((item) => (
              <Card id={item.id} title={item.title} tag={item.tag} />
          ))}
        </ul>
      </div>

      <div className="status-column">
        <h2 className="status-title">"Backlog" {backlog.length}</h2>
        <ul className="ticket-list">
          {backlog.map((item) => (
              <Card id={item.id} title={item.title} tag={item.tag} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Status;
