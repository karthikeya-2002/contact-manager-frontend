import React, { useState, useEffect } from 'react';
import api from '../api';
import countryCodes from '../data/countryCodes';
import '../App.css';

function ContactForm({ onContactAdded, editingContact }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (editingContact) {
      setFirstName(editingContact.firstName);
      setLastName(editingContact.lastName);
      setEmail(editingContact.email);
      setCountryCode(editingContact.countryCode);
      setPhone(editingContact.phone.replace(editingContact.countryCode, ''));
    }
  }, [editingContact]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Enter valid email');
      return;
    }
    if (phone.length !== 10 || isNaN(phone)) {
      alert('Phone number must be 10 digits');
      return;
    }

    const contactData = {
      firstName,
      lastName,
      email,
      countryCode,
      phone: countryCode + phone,
    };

    const request = editingContact
      ? api.put(`/${editingContact._id}`, contactData)
      : api.post('/', contactData);

    request.then(() => {
      onContactAdded();
      setFirstName('');
      setLastName('');
      setEmail('');
      setCountryCode('+91');
      setPhone('');
    });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
  <div className="row">
    <input
      className="half"
      placeholder="First Name"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
    />
    <input
      className="half"
      placeholder="Last Name"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
    />
  </div>
  
  <div className="row">
    <input
      className="email"
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>

  <div className="row">
    <div className="phone-group">
      <select
        className="country-code"
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
      >
        {countryCodes.map(cc => (
          <option key={cc.dial_code} value={cc.dial_code}>
            {cc.name} ({cc.dial_code})
          </option>
        ))}
      </select>
      <input
        className="phone"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
        maxLength={10}
      />
    </div>
  </div>

  <button type="submit">{editingContact ? 'Update' : 'Add'} Contact</button>
</form>
  );
}

export default ContactForm;
