import React, { useState, useEffect } from 'react';
import './App.css';
import api from './api';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);

  const fetchContacts = () => {
    api.get('/')
      .then(res => setContacts(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/${id}`);
    fetchContacts();
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setSearchClicked(false);
    setSearchTerm('');
  };

  const handleContactAdded = () => {
    setEditingContact(null);
    fetchContacts();
    setSearchClicked(false);
    setSearchTerm('');
  };

  const sortedContacts = [...contacts].sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );

  const filteredContacts = (searchClicked && searchTerm)
    ? sortedContacts.filter(c =>
        c.firstName.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        c.phone.startsWith(searchTerm)
      )
    : sortedContacts;

  return (
    <div className="container">
      <h1>Contact Manager</h1>

      <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name or phone"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setSearchClicked(true)}>Search</button>
    </div>


      <ContactForm onContactAdded={handleContactAdded} editingContact={editingContact} />
      <ContactList contacts={filteredContacts} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}

export default App;
