import React from 'react';
import '../App.css';

function ContactList({ contacts, onDelete, onEdit }) {
  return (
    <div className="contact-list">
      <h2>Saved Contacts</h2>
      <ul>
        {contacts.length === 0 ? (
          <p>No contacts found.</p>
        ) : (
          contacts.map(contact => (
            <li key={contact._id}>
              <div className="contact-info">
                <p><strong>{contact.firstName} {contact.lastName}</strong></p>
                <p>{contact.email}</p>
                <p>{contact.phone}</p>
              </div>
              <div className="contact-actions">
                <button className="view-btn" onClick={() => alert(
                  `Name: ${contact.firstName} ${contact.lastName}\nEmail: ${contact.email}\nPhone: ${contact.phone}`
                )}>View</button>
                <button className="edit-btn" onClick={() => onEdit(contact)}>Update</button>
                <button className="delete-btn" onClick={() => onDelete(contact._id)}>Delete</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ContactList;
