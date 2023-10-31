import React, { useState, useEffect } from 'react';
import { Card } from './components/Card';
import './Priority.css';

function Priority({ sorting }) {
  const [urgent, setUrgent] = useState([]);
  const [high, setHigh] = useState([]);
  const [medium, setMedium] = useState([]);
  const [low, setLow] = useState([]);
  const [noPriority, setNoPriority] = useState([]);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch("https://api.quicksell.co/v1/internal/frontend-assignment", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // Filter data based on priority
        const categorizedTickets = data.tickets.reduce((categories, ticket) => {
          switch (ticket.priority) {
            case 4:
              categories.urgent.push(ticket);
              break;
            case 3:
              categories.high.push(ticket);
              break;
            case 2:
              categories.medium.push(ticket);
              break;
            case 1:
              categories.low.push(ticket);
              break;
            default:
              categories.noPriority.push(ticket);
              break;
          }
          return categories;
        }, { urgent: [], high: [], medium: [], low: [], noPriority: [] });

        // Sort the data based on the sorting prop
        if (sorting === 'priority') {
          categorizedTickets.urgent.sort((a, b) => b.priority - a.priority);
          categorizedTickets.high.sort((a, b) => b.priority - a.priority);
          categorizedTickets.medium.sort((a, b) => b.priority - a.priority);
          categorizedTickets.low.sort((a, b) => b.priority - a.priority);
          categorizedTickets.noPriority.sort((a, b) => b.priority - a.priority);
        } else if (sorting === 'Title') {
          categorizedTickets.urgent.sort((a, b) => a.title.localeCompare(b.title));
          categorizedTickets.high.sort((a, b) => a.title.localeCompare(b.title));
          categorizedTickets.medium.sort((a, b) => a.title.localeCompare(b.title));
          categorizedTickets.low.sort((a, b) => a.title.localeCompare(b.title));
          categorizedTickets.noPriority.sort((a, b) => a.title.localeCompare(b.title));
        }

        setUrgent(categorizedTickets.urgent);
        setHigh(categorizedTickets.high);
        setMedium(categorizedTickets.medium);
        setLow(categorizedTickets.low);
        setNoPriority(categorizedTickets.noPriority);
      })
      .catch((error) => console.log('error', error));
  }, [sorting]);
// console.log(ticket);
return (
  <main className="main-container">
    <div className="priority-column">
      <h2 className="priority-title">Urgent Priority</h2>
      {urgent.map((ticket) => (
        <Card id={ticket.id} title={ticket.title} tag={ticket.tag} />
      ))}
    </div>
    <div className="priority-column">
      <h2 className="priority-title">High Priority</h2>
      {high.map((ticket) => (
        <Card id={ticket.id} title={ticket.title} tag={ticket.tag} />
      ))}
    </div>
    <div className="priority-column">
      <h2 className="priority-title">Medium Priority</h2>
      {medium.map((ticket) => (
        <Card id={ticket.id} title={ticket.title} tag={ticket.tag} />
      ))}
    </div>
    <div className="priority-column">
      <h2 className="priority-title">Low Priority</h2>
      {low.map((ticket) => (
        <Card id={ticket.id} title={ticket.title} tag={ticket.tag} />
      ))}
    </div>
    <div className="priority-column">
      <h2 className="priority-title">No Priority</h2>
      {noPriority.map((ticket) => (
        <Card id={ticket.id} title={ticket.title} tag={ticket.tag} />
      ))}
    </div>
  </main>
);
}
export default Priority;